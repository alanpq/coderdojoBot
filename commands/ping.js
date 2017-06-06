exports.run = (client, message, config, args) => {
  message.reply("Pong!").catch(console.error);
}