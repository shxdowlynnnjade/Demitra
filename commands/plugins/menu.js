import fetch from 'node-fetch';
import Jimp from 'jimp';

export default {
  command: ['menu', 'help', 'allmenu'], // Comandos que activan este plugin
  category: 'main',
  description: 'Muestra el menú de comandos del bot',
  run: async (client, m, usedPrefix = '#') => {
    try {
      // Descargar imagen de portada
      const imageUrl = 'https://files.catbox.moe/s3gu8x.jpg';
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();

      // Crear thumbnail (300x150)
      const thumb = await Jimp.read(buffer)
        .then(img => img.resize(300, 150).getBufferAsync(Jimp.MIME_JPEG))
        .catch(() => buffer); // fallback en caso de error

      // Datos dinámicos del usuario
      const tagUser = '@' + m.sender.split('@')[0];
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Buenos días 🌅' : hour < 18 ? 'Buenas tardes 🌤' : 'Buenas noches 🌙';

      const menuTexto = `Hola ${tagUser}, ${greeting}!\nBienvenid@ a DemitraBot 🌸`;

      // Enviar mensaje tipo documento con thumbnail + botones
      await client.sendMessage(
        m.chat,
        {
          document: buffer, // se envía la misma imagen como "documento dummy"
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

    } catch (e) {
      console.error('Error en plugin menu.js:', e);
      await m.reply('❌ Ocurrió un error al generar el menú.');
    }
  }
};