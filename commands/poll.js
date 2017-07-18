var Discord = require("discord.js");
exports.options = {requireMod:true};

var polls = {};

var emoj = [":zero:", "1⃣", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:", ":keycap_ten:"];

exports.run = (client, message, data, configs, args) => {
  //title, description, options....
  if(args.length < 2) return message.reply("Insufficient arguments.");
  var title = args[0];
  var description = args.join(" ").split('"')[1];
  var duration = parseFloat(args[1 + description.split(" ").length], 10);
  duration = duration * 3600000; //convert from hours to milliseconds
  
  console.log(duration);
  var opts = args.splice(2 + description.split(" ").length);
  console.log(opts.join(", "));
  var embed = new Discord.RichEmbed()
    .setTitle(title)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x00AE86)
    .setDescription(description)
    .setTimestamp();
  var fieldVal = emoj.splice(0);
  fieldVal.splice(opts.length);
  embed.addField("Options", fieldVal.join("\n"));
  console.log(fieldVal.join("\n"));
  //embed.addField("React to this message with your selection!", fieldVal.join(" - \n"), false);
  
  var self = {fieldVal: fieldVal};
  var checkEmoji = function (reaction, user) {
    //console.log("\\" + reaction.emoji.name);
    //console.log(this.fieldVal.join(", "));
    //console.log(this.fieldVal.indexOf(reaction.emoji.name));
    //console.log(this.fieldVal.indexOf(reaction.emoji.name) != -1);
    return this.fieldVal.indexOf(reaction.emoji.name) != -1;
  }.bind(self);
  message.channel.send({embed:embed}).then((msg) => {
    var collector = msg.createReactionCollector(
     (reaction, user) => checkEmoji(reaction,user),
     { time: duration }
    );

    collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
  });
}

// .addField('Inline Field', 'They can also be inline.', true)

//   hey "hey hey" wo
//   hey, hey hey, wo