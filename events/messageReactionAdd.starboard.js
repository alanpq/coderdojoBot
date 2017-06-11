var Discord = require("discord.js")
exports.run = (client, config, messageReaction, user) => {
  if(messageReaction.emoji.id != config.starboard.emojiID || messageReaction.message.author.bot) return;
  if(messageReaction.count >= config.starboard.reactQuota) {
    var message = messageReaction.message;
    var channel = message.guild.channels.find("name", config.starboard.channel);
    var embed = new Discord.RichEmbed()
      .setTitle(messageReaction.count + " " + messageReaction.emoji + " #" + message.channel.name + " (ID: " + message.id + ")")
      .setDescription(message.content)
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTimestamp(message.createdAt);
    if(messageReaction.users.has(message.author.id))
      embed.addField(":exclamation: WARNING :exclamation:", "Self-upvoter detected!");
    channel.send({embed:embed});
  }
}