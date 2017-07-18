// Author: Alan Panayotov

/*
 * XP works as follows:
 * A user gains 5 xp when sending a message. The message must meet these criteria:
 *   - The message must not be identical in content to their previous 2 messages.
 *   - The message must not be a command.
 *   - The time between this message and the previous must be >15 seconds.
 *
 * A user also gains 15xp when thanked. This is classified as:
 *   - "thanks", "thx", "ty", etc. followed by a mention (e.g @letrollerman)
 *
 * Users also get 10xp per upvote given.
 *
 * These values are subject to change.
*/

var saveJSON = (json, path, cb) => {
  fs.writeFile(path, JSON.stringify(json), (err) => {
    if(cb) cb(err);
    else if(err) console.error(err);
  })
}

exports.run = (client, data, configs, msg) => {
  if (msg.author.bot) return;
  console.log(msg.content);
  if(msg.content[0] == configs.main.cmdPrefix) return;

  var entry = data.xp[msg.author.id];
  if(entry.history.length > 0) {
    if(msg.content == entry.history[0] || msg.content == entry.history[1]) return;
  }
  if(!entry.xp) entry.xp = 0;
  entry.xp += 1;




}
