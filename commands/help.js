//TODO: get this working
var fs = require("fs");
//console.log(fs);

/*
var readJSON = (path, cb) => {
  console.log(require.resolve(path));
  fs.readFile(require.resolve(path), (err, data) => {
    console.log("reeeed");
    if (err)
      cb(err)
    else
      cb(null, JSON.parse(data))
  });
};

var helps;
console.log("please kill me");
readJSON("./help.json", (err, j) => {
  console.log("callback");
  if(err) {
    console.error(err);
  } else {
    helps = j;
  }
});
console.log("json read hopefully");*/

var helps = require("./help.json");

var saveJSON = (json, path, cb) => {
  fs.writeFile(path, JSON.stringify(json), (err) => {
    if(cb) cb(err);
    else if(err) console.error(err);
  })
}

exports.run = (client, message, config, args) => {
  if(/[(\/)(\.)]/.test(args[0])) {
    message.delete();
    return;
  }
  
  if(args[0] == "edit" && args[1] && args[2]) {
    try {
      let resolved = require.resolve(`./${args[1]}.js`);
      if(resolved.length > 0) {
        let newHelp = args.slice(2).join(" ");
        helps[args[1]] = newHelp;
        message.reply("Help for `" + args[1] + "` has successfully been changed to ```\n" + newHelp + "```");
        saveJSON(helps, "commands/help.json");
        delete require.cache[resolved];
      } else {
        message.reply("The command `" + args[1] + "` could not be found.");
      }
    } catch (err) {
      
    }
  } else {
    var cmd = "help";
    var noHelp = `No help was found! Did you type it correctly?
  If you're sure, please contact a @Moderator.`;
    /*var noHelp = 
        `No help was found! Did you type it correctly?
  If you're sure, please contact a @Moderator.`;*/

    if(args.length > 0 && helps != undefined){
      cmd = args[0];
    }
    
    if(cmd == "help") {
      var string = "The following commands are available:";
      var cmds = Object.keys(helps);
      for(var i = 0; i < cmds.length; i++) {
        string += "\n" + cmds[i] + " - " + helps[cmds[i]].split("\n")[0];
      }
      message.channel.send(string);
    } else {
      try {
        //let commandFile = require(`./${cmd}.js`);
        if(!helps[cmd])
          message.channel.send(noHelp);
        else
          message.channel.send(helps[cmd]);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
