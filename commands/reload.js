
exports.options = {reqiureMod:true};

exports.run = (client, message, data, configs, args) => {
  if(!args || args.length < 1) return message.reply("Must provide a command name to reload.");
  
  var resolved;
  try {
    resolved = require.resolve(`./${args[0]}.js`)
  } catch (err) {
    return message.reply("The command `" + args[0] + "` does not exist!")
  }
  
  delete require.cache[resolved];
  message.reply(`The command \`${args[0]}\` has been reloaded`);
};