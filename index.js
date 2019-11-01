require('dotenv').config()

const dns = require('dns');
const publicIp = require('public-ip')

const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_API_KEY);


function automatedCheckip(){
  dns.lookup(process.env.DOMAIN,(err,address,family) => {
    (async () => {
      localPublicIp = await publicIp.v4();
      if (address != localPublicIp) {
        bot.telegram.sendMessage(process.env.ALLOWED_USER.split(' ')[0],`⚠ Dns record (${address}) != LocalPublicIP (${localPublicIp}) `);
      }
    })()
  })
}

function allowedUser(id) {
    return process.env.ALLOWED_USER.split(' ').includes(id.toString())
}

function checkCorretIpDns(ctx){
  dns.lookup(process.env.DOMAIN,(err,address,family) => {
    (async () => {
      localPublicIp = await publicIp.v4();
      ctx.reply('PublicIp '+localPublicIp+'\n DNS lookupIp '+address);
    })()
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
    checkCorretIpDns(ctx)
  })

// Implement here function to check ip or other stuff
//setInterval(yourFunction, 1000 * 60 * 60);

bot.startPolling();
setInterval(automatedCheckip, process.env.CHECK_IP_INTERVAL );
console.log('Bot started');
