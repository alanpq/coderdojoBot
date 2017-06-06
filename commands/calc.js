var mathjs = require("mathjs");
mathjs.createUnit('astronomicalunit', {definition: '149597870700 m', aliases: ['au', 'ua', 'astronomicalunits'] });
mathjs.createUnit('meme', {definition: '100 megabytes', prefixes: 'binary_long', aliases: ['memes'] });
mathjs.createUnit('dankmeme', {definition: '1000 megameme', prefixes: 'binary_long', aliases: ['dankmemes'] });
//mathjs.createUnit('dank');

var parsers = {};
exports.run = (client, message, config, args) => {
  if(message.author.bot) return;
  if(!parsers[message.author.id]) {
    parsers[message.author.id] = mathjs.parser();
  }
  
  var ret = parsers[message.author.id].eval(args.join(" "));
  if(ret && (ret + "").length > 0)
    message.channel.send(ret + "");
}

exports.help = `Provides a 
test`;