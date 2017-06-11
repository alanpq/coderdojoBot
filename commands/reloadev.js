
exports.options = {reqiureMod:true};

exports.run = (client, message, config, args) => {
  if(!args || args.length < 1) return message.reply("Must provide an event name to reload.");
  
  var resolved;
  try {
    resolved = require.resolve(`././events/${args[0]}.js`);
  } catch (err) {
    console.err(err);
    return message.reply("The event `" + args[0] + "` does not exist!");
  }
  
  delete require.cache[resolved];
  message.reply(`The event \`${args[0]}\` has been reloaded`);
};