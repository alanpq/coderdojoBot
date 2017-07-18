
var players = {};

var questions = [
  `Are you over the age of 13? (y/n):`
];
//Players have states depending on what question they are on (assuming there are multiple)
//0 - Are you over 13?
//If a player is not found in this list, they have answered the questions.

exports.run = (client, data, configs, msg) => {
  var pl = players[msg.author.id];
  if(pl != undefined && pl.channel == msg.channel) {
    var next = true;
    switch(pl.state) {
      case 0: //has answered Q1
        if(/[y|Y]|[y|Y][e|E][s|S]/.test(msg.content)) {
          pl.channel.send("Alright!");
          pl.member.addRole(roles.over13);
          pl.member.addRole(roles.ninja);

        } else if (/[n|N]|[n|N][o|O]/.test(msg.content)){
          pl.channel.send("Alright!");
          pl.member.addRole(roles.ninja);
        } else {
          pl.channel.send('That wasn\'t a valid response.\nPlease answer with "yes" or "no"');
          next = false;
          //pl.channel.send("");
        }
      break;
    }
    if(next) {
      if(pl.state < questions.length-1) {
        pl.state++;
        pl.channel.send(questions[pl.state]);
      } else {
        pl.channel.send("Thank you for you patience, and welcome to the CoderDojo Discord!\nPlease make sure to read the rules (#rules) first, and most of all - have fun!");

        pl.member.guild.defaultChannel.send(`Please welcome ${pl.member} to the server!`);
      }
    }
  }
}
