import fetch from 'node-fetch';

export default {
  command: ['menu','help','allmenu'],
  category: 'main',
  description: 'Muestra el menú de comandos del bot',
  run: async (client, m) => {
    try {
      const botname = global.botname || 'DemitraBot';
      const senderName = m.pushName || 'amig@';

      // Descargar la imagen de portada
      const imageUrl = 'https://files.catbox.moe/s3gu8x.jpg';
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();
      const base64 = buffer.toString('base64'); // para thumbnail

      // Texto del menú
      const menuTexto = `Hola @${m.sender.split('@')[0]}, bienvenid@ a *${botname}* 🌸
Aquí tienes tu menú de comandos:`; 

      // Enviar mensaje tipo "documento" con preview y botón opcional
      await client.sendMessage(
        m.chat,
        {
          document: buffer,
          mimetype: 'application/pdf',
          fileName: 'archivomenudemilove.pdf',
          caption: menuTexto,
          mentions: [m.sender],
          contextInfo: {
            externalAdReply: {
              title: botname,
              body: 'Menú interactivo 🌸',
              mediaType: 1,
              thumbnail: base64,
              renderLargerThumbnail: true,
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
      console.error('Error en plugin menu.js:', e);
      m.reply('❌ Ocurrió un error al generar el menú, intenta de nuevo.');
    }
  }
};