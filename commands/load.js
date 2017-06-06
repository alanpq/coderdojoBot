const perlin = require("perlin-noise")
const NanoTimer = require('nanotimer');

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

exports.run = (client, message, config, args) => {
  var text        = args[0];
  var duration    = parseInt(args[1], 10) * 1000;
  
  
  var max = 30;
  var progress = 0;
  var msg = null;
  
  var noise = perlin.generatePerlinNoise(max, 1);
  var sumA = noise.reduce((total, num) => {return total + num;});
  
  var timer = new NanoTimer();


  var updateText = function() {
    progress++;
    msg.edit(text + "\n`|" + '='.repeat(progress) + 'x'.repeat(max-progress) + "|`");
    if(progress < max)
      timer.setTimeout(updateText, '', ((noise[progress-1]/sumA)*duration) + 'm');//(noise[progress-1]/sumA)*duration);
    else
      console.log("done");
    
  }

  message.channel.send(text + "\n`|" + '='.repeat(progress) + 'x'.repeat(max-progress) + "|`")
    .then(m => {msg = m; updateText();});
  //
  //
  //*/
  
  
  
  
  
}