import fetch from 'node-fetch';
import Jimp from 'jimp';

export default {
  command: ['menu', 'help', 'allmenu'], // comandos que activan este plugin
  category: 'main',
  description: 'Muestra el menú de comandos del bot',
  run: async (client, m, args, usedPrefix = '#') => {
    try {
      // 1️⃣ Descargar imagen de portada
      const imageUrl = 'https://files.catbox.moe/s3gu8x.jpg';
      const response = await fetch(imageUrl);
      const imageBuffer = await response.buffer();

      // 2️⃣ Crear thumbnail 300x150
      const thumb = await Jimp.read(imageBuffer)
        .then(img => img.resize(300, 150).getBufferAsync(Jimp.MIME_JPEG))
        .catch(() => imageBuffer);

      // 3️⃣ Datos dinámicos
      const tagUser = '@' + (m.pushName || m.sender.split('@')[0]);
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Buenos días 🌅' : hour < 18 ? 'Buenas tardes 🌤' : 'Buenas noches 🌙';

      const menuTexto = `Hola ${tagUser}, ${greeting}!\nBienvenid@ a DemitraBot 🌸\n\nUsa los botones para navegar por el menú`;

      // 4️⃣ Mensaje con botones y thumbnail
      await client.sendMessage(
        m.chat,
        {
          document: imageBuffer,          // imagen como documento "dummy" para WhatsApp
          mimetype: 'image/jpeg',
          fileName: 'Demilove.jpg',
          caption: menuTexto,
          jpegThumbnail: thumb,
          mentions: [m.sender],
          buttons: [
            { buttonId: '.allmenu', buttonText: { displayText: 'Menú Completo' }, type: 1 },
            { buttonId: '.infobot', buttonText: { displayText: 'Info Bot' }, type: 1 },
            { buttonId: '.chatgpt', buttonText: { displayText: 'IA ChatGPT' }, type: 1 }
          ],
          contextInfo: {
            externalAdReply: {
              title: 'DemitraBot 🌸',
              body: 'Menú interactivo',
              mediaType: 1,
              thumbnail: thumb,
              sourceUrl: 'https://whatsapp.com/channel/0029VbBvrmwC1Fu5SYpbBE2A'
            }
          }
        },
        { quoted: m }
      );

      console.log('✅ Plugin menu.js activado por:', m.sender);

    } catch (e) {
      console.error('❌ Error en plugin menu.js:', e);
      await m.reply('❌ Ocurrió un error al generar el menú.');
    }
  }
};