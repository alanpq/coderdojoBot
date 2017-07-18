'use strict';

const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();
const _ = require("underscore");


var args = process.argv.slice(2);
const token = args[0];

var roles = {};

//////////////////////////////////////////begin modularisation///////////////////////////////////////////////

const readJSON = (path, cb) => {
  fs.readFile(require.resolve(path), (err, data) => {
    if (err)
      cb(err)
    else {
      cb(null, JSON.parse(data))
    }
  })
}

const saveJSON = (json, path, cb) => {
  fs.writeFile(path, JSON.stringify(json), (err) => {
    if(cb) cb(err);
    else if(err) console.error(err);
  })
}

const saveJSONSync = (json, path, cb) => {
  fs.writeFileSync(path, JSON.stringify(json));
}


var data = {};
var configs = {};

var mainCFG = {};
var timezonesDAT, xpDAT = {};

readJSON("./config.json", (err, json) => {configs["main"] = json});
readJSON("./data/xp.json", (err, json) => {data["xp"] = json});
readJSON("./data/timezones.json", (err, json) => {data["timezones"] = json});


var _channel; //global channel (since this bot is only for the CoderDojo channel)
var log, warn, error;

//reroute console.log, warn and error to also send to channels
const _log = console.log;
const _warn = console.warn;
const _error = console.error;

console.log = function(options, msg) {
  if(typeof options == "object" && arguments.length > 1)
    Array.prototype.shift.call(arguments);
  else
    msg = options;

  _log.apply(this, arguments);
  if(!log) return;
  log.send({embed: new Discord.RichEmbed()
    .setTitle('Log')
    .setAuthor('CoderDojo Bot', client.user.avatarURL)
    .setColor(0x00AE86)
    .setDescription(msg)
    //adds thumbnail if there is a user in question
    .setThumbnail((options && options.user) ? options.user.avatarURL : "")
    .setTimestamp()
  });
}

console.warn = function(options, msg) {
  if(typeof options == "object" && arguments.length > 1)
    Array.prototype.shift.call(arguments);
  else
    msg = options;

  _warn.apply(this, arguments);
  if(!warn) return;
  warn.send({embed: new Discord.RichEmbed()
    .setTitle('Warning')
    .setAuthor('CoderDojo Bot', client.user.avatarURL)
    .setColor(0xf1c40f)
    .setDescription(msg)
    //adds thumbnail if there is a user in question
    .setThumbnail((options.user) ? options.user.avatarURL : "")
    .setTimestamp()
  });
}

console.error = function(options, msg) {
  if(typeof options == "object" && arguments.length > 1)
    Array.prototype.shift.call(arguments);
  else
    msg = options;
  _error.apply(this, arguments);
  if(!warn) return;
  error.send({embed: new Discord.RichEmbed()
    .setTitle('Error')
    .setAuthor('CoderDojo Bot', client.user.avatarURL)
    .setColor(0xe74c3c)
    .setDescription(msg)
    //adds thumbnail if there is a user in question
    .setThumbnail((options.user) ? options.user.avatarURL : "")
    .setTimestamp()
  });
}


//attach client events to external js files
//based on the name of the file, it is attached to different events
//eg. message.js -> client.on('message')
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];

    client.on(eventName, (...args) => eventFunction.run(client, data, configs, ...args));
  });
});

//dynamic command system by attempting to load js file matching client message
client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(configs.main.cmdPrefix)) return;

  const args = message.content.split(" ");
  const command = args.shift().slice(configs.main.cmdPrefix.length);

  //SANITISE!
  if(/[(\/)(\.)]/.test(command)) {
    //console.warn({user: message.author}, message.author + " (" + message.author.username + ") tried to load js outside of commands folder!")
    //message.channel.send(message.author + ", naughty!");
    //message.delete();
    return;
  }

  try {
    let commandFile = require(`./commands/${command}.js`);
    let options = commandFile.options;
    _.defaults(options, {requireMod: false});
    if(!message.member.roles.has("280109873105076235") && options.requireMod) return message.reply("You have insufficient permissions to run `"+ command +"`.")

    commandFile.run(client, message, data, configs, args);
  } catch (err) {}
});


//////////////////////////////////////////////back to icky code//////////////////////////////////////////////

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  roles.ninja = client.guilds.first().roles.find('name', 'Ninjas');
  roles.over13 = client.guilds.first().roles.find('name', 'Over 13');

  _channel = client.guilds.first();
  log = _channel.channels.find('name', configs.main.logChannel);
  warn = _channel.channels.find('name', configs.main.warnChannel);
  error = _channel.channels.find('name', configs.main.errorChannel);
  _channel.channels.find('name', configs.main.starboard.channel).setTopic(configs.main.starboard.channelDesc.replace("{x}", configs.main.starboard.reactQuota));
});





client.on('guildMemberAdd', member => {
  var promise = member.createDM();
  promise.then((dmChannel) => {
    players[dmChannel.recipient.id] = {state:0, channel:dmChannel, member:member};
    dmChannel.send(`Hello ${member}! Before you can join the CoderDojo Discord, we'd like you to answer some questions:\n${questions[players[dmChannel.recipient.id].state]}`);
  })



  const channel = member.guild.channels.find('name', 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

client.login(token);

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) { //synchronous operations only
    console.log('Cleaning up..');
    client.destroy();
    saveJSONSync(data.xp, "./data/xp.json");
    saveJSONSync(data.timezones, "./data/timezones.json");
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
