require('dotenv').config()
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_API_KEY);


function allowedUser(id) {
  return true;
    allowedUserList = [] // Add .env variables for allowed user

    if (allowedUserList.includes(id)) {
      return true;
    }
    return false;
}

bot.start((message) => {
  console.log('started:', message.from.id)

  if (!allowedUser(message.from.id)) {
    console.log('user not have permission');
    return message.reply('Non hai i permessi per questa chat!!');
  }
  return message.reply('Hello my friend, write anything to start search!!');
})

bot.on('text', message=> {
  if (!allowedUser(message.from.id)) {
    console.log('user not have permission');
    return message.reply('Non hai i permessi per questa chat!!');
  }
  console.log('ciao');

  console.log(message.message);
})


// Implement here function to check ip or other stuff
//setInterval(yourFunction, 1000 * 60 * 60);


bot.startPolling();
