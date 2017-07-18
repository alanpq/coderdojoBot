var player = null;
var pt = null;

function removeMSGS(channel) {
  if(channel.messages.last()) {
    channel.bulkDelete(100);
    setTimeout(removeMSGS(channel), 1000);
  }
}

exports.options = {requireMod: true};

exports.run = (client, message, data, configs, args) => {
  ///280109873105076235 is moderator role
  if(message.author.bot) return;
  
  //console.log(player);
  if(message.author == player && args[0] == "yes") {// ) {
    if(pt != null) clearTimeout(pt);
    message.channel.send("Purging *all messages* from " + message.channel + "...");
    setTimeout(removeMSGS(message.channel), 1000);
    player = null;
  } else if(player != null){
    if(pt != null) clearTimeout(pt);
    message.channel.send("Purge *cancelled*");
    player = null;
  }
  if(args[0] == "*") { //wants to do full purge
    message.reply("Woah. Are you *sure*?\nType `/purge yes` again to confirm and `/purge no` to cancel.");
    player = message.author;
    
    pt = setTimeout(function() {
      player = null;
      message.reply("Purge was cancelled due to inactivity.");
    }, 5000);
  } else if(args[0] != undefined){
    message.channel.bulkDelete(parseInt(args[0], 10));
  }
}

exports.help = ``;