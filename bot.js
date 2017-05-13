'use strict';
const Discord = require("discord.js");
const client = new Discord.Client();

var args = process.argv.slice(2);
const token = args[0];

var roles = {};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  roles.ninja = client.guilds.first().roles.find('name', 'Ninjas');
  roles.over13 = client.guilds.first().roles.find('name', 'Over 13');
});

client.on('message', msg => {
  var pl = players[msg.author.id];
  if(pl != undefined && pl.channel == msg.channel) {
    switch(pl.state) {
      case 0: //has answered Q1
        if(/[y|Y]|[y|Y][e|E][s|S]/.test(msg.content)) {
          pl.channel.send("Alright!");
          pl.member.addRole(roles.over13);
          pl.member.addRole(roles.ninja);

        } else if (/[n|N]|[n|N][o|O]/.test(msg.content)){
          pl.channel.send("Alright!");
          pl.member.addRole(roles.ninja);
        } else {
          pl.channel.send("That wasn't a valid response.");
          pl.channel.send("Please answer with \"yes\" or \"no\"");
        }
      break;
    }
    if(pl.state < questions.length-1) {
      pl.state++;
      pl.channel.send(questions[pl.state]);
    }
    else {
      pl.channel.send("Thank you for you patience, and welcome to the CoderDojo Discord!");
      pl.channel.send("Please make sure to read the rules (#rules) first, and most of all - have fun!");
    }
  }
});

var players = {};

var questions = [
  `Are you over the age of 13? (y/n):`
];
//Players have states depending on what question they are on (assuming there are multiple)
//0 - Are you over 13?
//If a player is not found in this list, they have answered the questions.

client.on('guildMemberAdd', member => {
  var promise = member.createDM();
  promise.then((dmChannel) => {
    players[dmChannel.recipient.id] = {state:0, channel:dmChannel, member:member};
    dmChannel.send(`Hello ${member}! Before you can join the CoderDojo Discord, we'd like you to answer some questions:`);
    dmChannel.send(questions[players[dmChannel.recipient.id].state]);
  })

  member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
  member.guild.defaultChannel.send(`Please check your DMs for info.`);

  const channel = member.guild.channels.find('name', 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});


client.login(token);
