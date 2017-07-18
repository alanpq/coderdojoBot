exports.run = (client, message, data, configs, args) => {
  if(message.author.bot) return;
  message.reply(data.xp[message.author.id] + "xp");
}
