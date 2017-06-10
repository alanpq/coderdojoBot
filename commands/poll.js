var Discord = require("discord.js/");
exports.options = {requireMod:true};

var polls = {};

var emoj = [":zero:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:", ":keycap_ten:"];

exports.run = (client, message, config, args) => {
  //title, description, options....
  if(args.length < 2) return message.reply("Insufficient arguments.");
  var title = args[0];
  var description = args.join(" ").split('"')[1];
  var duration = parseInt(args[1 + description.split(" ").length], 10);
  console.log(duration);
  var opts = args.splice(2 + description.split(" ").length);
  var embed = new Discord.RichEmbed()
    .setTitle(title)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x00AE86)
    .setDescription(description)
    .setTimestamp();
  var fieldVal = emoj.splice();
  fieldVal.splice(opts.length-1);
  console.log(fieldVal.join("\n"));
  //embed.addField("React to this message with your selection!", fieldVal.join(" - \n"), false);
  message.channel.send({embed:embed});
  setTimeout(function() {}, 100);
}

// .addField('Inline Field', 'They can also be inline.', true)

//   hey "hey hey" wo
//   hey, hey hey, wo