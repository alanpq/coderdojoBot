'use strict';
const Discord = require("discord.js");
const client = new Discord.Client();
var args = process.argv.slice(2);
const token = args[0];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(token);
