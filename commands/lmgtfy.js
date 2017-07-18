exports.run = (client, message, data, configs, args) => {
  if(args.length < 1) return message.reply("Please provide a search query!");
  message.channel.send("http://www.lmgtfy.com/?q=" + encodeURIComponent(args.join(" ")));
}