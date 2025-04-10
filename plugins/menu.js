const path = require('path');
const fs = require('fs');

// Handler function
const handler = async ({ bot, m, text, db, usedPrefix }) => {
  try {
    // Check if bot is available
    if (!bot) {
      throw new Error('Bot instance is not available');
    }

    // Fetch random quote from a local file (Quotes.txt)
    const quoteFilePath = path.join(__dirname, '../assets/Quotes.txt');
    if (!fs.existsSync(quoteFilePath)) {
      throw new Error('Quotes file not found');
    }

    const quotes = fs.readFileSync(quoteFilePath, 'utf8').split('\n');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].trim();

    // Prepare the bot menu message
    let menuText = `
    MAIN MENU:

    📖 Quote Of The Day: 
    "${randomQuote}"

    🔧 Commands:
      - ▢ 1. /downloadmenu
      - ▢ 2. /textpromenu
      - ▢ 3. /animenu
      - ▢ 3. /botmenu
      - ▢ 4. /infomenu
      - ▢ 5. /quotesmenu
      - ▢ 6. /toolsmenu
      - ▢ 7. /imagesmenu
      - ▢ 0. /mainmenu

    Enjoy your time with the bot! 😊`;

    // Check if the photo exists
    const photoPath = path.join(__dirname, '../assets/A.jpg');  // Ensure the correct path
    if (!fs.existsSync(photoPath)) {
      console.error('Photo file not found at path:', photoPath);
      return;
    }

    // Prepare the inline keyboard buttons
    const inlineKeyboard = {
      inline_keyboard: [
        [{ text: 'Refresh Menu', callback_data: 'refresh_menu' }],
      ],
    };

    // Send the menu along with the photo (image as caption) and inline buttons
    await bot.sendPhoto(m.chat.id, photoPath, {
      caption: menuText,  // Full menu as caption
      reply_markup: inlineKeyboard,  // Inline keyboard buttons
    });

    console.log('Menu sent with photo and buttons!');
  } catch (error) {
    console.error('Error in menu plugin:', error);
    // Send a message in case of error but prevent the app from crashing
    if (bot) {
      await bot.sendMessage(m.chat.id, 'An error occurred while generating the bot menu. Please try again later.');
    }
  }
};

handler.command = ['menu', 'list']
handler.help = ['menu', 'list']
handler.tags = ['main']

module.exports = handler;
