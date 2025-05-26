const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('Web server running on port 3000'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'wolf.hylexmc.net',
    port: 25565,
    username: 'proguys267',
    version: '1.21.1'
  });

  bot.once('spawn', () => {
    console.log('Bot spawned!');
    setTimeout(() => bot.chat('/login proguysopworker'), 3000);
    setTimeout(() => bot.chat('/join  earth'), 7000);
    setInterval(() => {
      const yaw = Math.random() * 2 * Math.PI;
      bot.look(yaw, 0, true);
    }, 30000);
  });

  bot.on('death', () => {
    console.log('Bot died, respawning...');
    setTimeout(() => bot.chat('/home hello'), 3000);
  });

  bot.on('message', (msg) => {
    const text = msg.toString().toLowerCase();
    if (text.includes('kicked') || text.includes('hub')) {
      setTimeout(() => bot.chat('/join survival'), 5000);
    }
  });

  bot.on('end', () => {
    console.log('Bot disconnected, reconnecting...');
    setTimeout(createBot, 10000);
  });

  bot.on('kicked', reason => {
    console.log('Kicked:', reason);
  });

  bot.on('error', err => {
    console.error('Error:', err);
  });
}

createBot();
