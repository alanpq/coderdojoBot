const Discord = require("discord.js");
exports.run = (client, data, configs, msg) => {
  if(!configs.main.pgChannels.includes(msg.channel.name) || msg.author.bot) return;

  var swears = Object.keys(configs.main.swears);
  var final = msg.content;
  for(var i = 0; i < swears.length; i++) {
    final = final.replace(new RegExp(swears[i], "g"), configs.main.swears[swears[i]]);
  }

  if(final != msg.content) {
    msg.channel.send({embed: new Discord.RichEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL)
      .setColor(0xe74c3c)
      .setDescription(final)
      .setTimestamp(Date.parse(msg.timestamp))
    });

    msg.delete();
  }
}
