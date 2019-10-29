require('dotenv').config()

const dns = require('dns');
const publicIp = require('public-ip')

const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_API_KEY);

function allowedUser(id) {
    return process.env.ALLOWED_USER.split(' ').includes(id.toString())
}

async function checkCorrectIpDns(domain){
  dns.lookup(domain, (err,address,family) => {
    return {localPublicIp: await publicIp.v4(), address}
  })
}

bot.start((message) => {
  // check if user is allowed to user bot
  if (!allowedUser(message.from.id)) {
    return message.reply('Non hai i permessi per questa chat!!');
  }
  return message.reply('Hello my friend');
})

bot.command('checkip', (ctx) => {
    if (!allowedUser(ctx.from.id)) {
      return ctx.reply('Non hai i permessi per questa chat!!');
    }
    var r = await checkCorretIpDns(ctx);
    ctx.reply('PublicIp '+r.localPublicIp+'\n DNS lookupIp '+r.address);
  })

// Implement here function to check ip or other stuff
//setInterval(yourFunction, 1000 * 60 * 60);

bot.startPolling();
console.log('Bot started');
