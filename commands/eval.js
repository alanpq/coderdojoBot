exports.run = (client, message, data, configs, args) => {
  if(message.author.bot || message.author.toString() != "<@247440114869862401>") return message.reply("naughty!");
  var ret = eval(args.join(" "));
  if(!(ret && (ret + "").length > 0))
    ret = "*undefined*";
  message.channel.send(ret + "");
}
