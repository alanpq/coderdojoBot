exports.run = (client, message, data, configs, args) => {
  message.reply("Pong!").catch(console.error);
}