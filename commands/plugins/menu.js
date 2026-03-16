import fetch from 'node-fetch';
import Jimp from 'jimp';

export default {
  command: ['menu','help','allmenu'], // comandos que activan el plugin
  tags: ['main'],
  description: 'Muestra el menú del bot',
  
  run: async (m, { conn }) => {
    try {
      // --- Descargar imagen y crear thumbnail ---
      const imageUrl = 'https://files.catbox.moe/s3gu8x.jpg';
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();

      const thumb = await Jimp.read(buffer)
        .then(img => img.resize(300, 150).getBufferAsync(Jimp.MIME_JPEG))
        .catch(() => buffer);

      // --- Datos dinámicos ---
      const tagUser = '@' + m.sender.split('@')[0];
      const h = new Date().getHours();
      const greeting = h < 12 ? 'Buenos días 🌅' : h < 18 ? 'Buenas tardes 🌤' : 'Buenas noches 🌙';

      const menuTexto = `Hola ${tagUser}, ${greeting}!\nAquí está tu menú de comandos:`;

      // --- Enviar mensaje tipo documento con botones ---
      await conn.sendMessage(
        m.chat,
        {
          document: buffer, // usamos la misma imagen como PDF dummy
          mimetype: 'application/pdf',
          fileName: 'Demilove.pdf',
          caption: menuTexto,
          jpegThumbnail: thumb,
          contextInfo: {
            externalAdReply: {
              title: 'DemitraBot',
              body: 'Menú interactivo',
              mediaType: 1,
              thumbnail: thumb,
              sourceUrl: 'https://whatsapp.com/channel/0029VbBvrmwC1Fu5SYpbBE2A'
            }
          },
          footer: 'DEMITRA',
          buttons: [
            { buttonId: '.allmenu', buttonText: { displayText: 'Menú Completo' }, type: 1 },
            { buttonId: '.infobot', buttonText: { displayText: 'Info Bot' }, type: 1 },
            { buttonId: '.chatgpt', buttonText: { displayText: 'IA ChatGPT' }, type: 1 }
          ]
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      await m.reply('❌ Ocurrió un error al generar el menú.');
    }
  }
}