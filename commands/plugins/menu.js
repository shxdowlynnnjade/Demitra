import fetch from 'node-fetch';
import Jimp from 'jimp';

export default {
  command: ['menu','help','allmenu'],
  tags: ['main'],
  description: 'Muestra el menú interactivo del bot',
  run: async (m, { conn }) => {
    try {
      // Descargar imagen y generar thumbnail
      const imageUrl = 'https://files.catbox.moe/s3gu8x.jpg';
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();
      const thumb = await Jimp.read(buffer)
        .then(img => img.resize(300, 150).getBufferAsync(Jimp.MIME_JPEG))
        .catch(() => buffer);

      // Datos dinámicos
      const tagUser = '@' + m.sender.split('@')[0];
      const botName = await conn.getName(conn.user?.id || conn.user?.jid || '');
      const greeting = (() => {
        const h = new Date().getHours();
        return h < 12 ? 'Buenos días 🌅' : h < 18 ? 'Buenas tardes 🌤' : 'Buenas noches 🌙';
      })();

      const menuTexto = `Hola ${tagUser}, ${greeting}!\nAquí está tu menú de comandos de *${botName}*.`;

      // Enviar mensaje tipo documento con thumbnail y botones
      await conn.sendMessage(
        m.chat,
        {
          document: buffer,
          mimetype: 'application/pdf',
          fileName: 'archivomenudemi.pdf',
          caption: menuTexto,
          jpegThumbnail: thumb,
          footer: 'DemitraBot 🌸',
          contextInfo: {
            externalAdReply: {
              title: 'DemitraBot 🌸',
              body: 'Menú interactivo',
              mediaType: 1,
              thumbnail: thumb,
              sourceUrl: 'https://whatsapp.com/channel/0029VbBvrmwC1Fu5SYpbBE2A'
            }
          },
          buttons: [
            { buttonId: '.allmenu', buttonText: { displayText: 'Menú Completo' }, type: 1 },
            { buttonId: '.infobot', buttonText: { displayText: 'Info Bot' }, type: 1 },
            { buttonId: '.chatgpt', buttonText: { displayText: 'IA ChatGPT' }, type: 1 }
          ]
        },
        { quoted: m }
      );

    } catch (e) {
      console.error('Error en comando menu:', e);
      await m.reply('❌ Ocurrió un error al generar el menú.');
    }
  }
};