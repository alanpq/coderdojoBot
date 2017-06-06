var moment = require("moment");
var momentTZ = require("moment-timezone");
exports.run = (client, message, config, args) => {
  var t = config._timezones[message.author.toString()];
  message.reply("Today is " + moment().tz( ((t == undefined) ? "Europe/Dublin" : t) ).format("dddd, MMMM Do YYYY, h:mm:ssa z"));
}