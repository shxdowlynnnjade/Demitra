// commands/plugins/menu.js
import fetch from 'node-fetch';
import Jimp from 'jimp';

export default {
  command: ['menu', 'help', 'allmenu'],
  category: 'main',
  description: 'Muestra el menú de comandos del bot',
  run: async (client, m) => {
    try {
      const senderName = m.pushName || 'amig@';

      // URL de la imagen
      const imageUrl = 'https://files.catbox.moe/s3gu8x.jpg';
      const response = await fetch(imageUrl);
      const imageBuffer = await response.buffer();

      // Thumbnail para preview
      const thumb = await Jimp.read(imageBuffer)
        .then(img => img.resize(300, 150).getBufferAsync(Jimp.MIME_JPEG))
        .catch(() => imageBuffer);

      // Saludo según hora
      const hora = new Date().getHours();
      const saludo = hora < 12 ? 'Buenos días 🌅' : hora < 18 ? 'Buenas tardes 🌤' : 'Buenas noches 🌙';

      // Texto del menú
      const menuTexto = `Hola @${m.sender.split('@')[0]}, ${saludo}!\nBienvenid@ a DemitraBot 🌸\n\nAquí están mis comandos principales: ...`;

      // Crear PDF "dummy" como buffer para mostrar icono PDF
      const pdfBuffer = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF', 'utf-8');

      // Enviar mensaje con imagen + PDF preview
      await client.sendMessage(
        m.chat,
        {
          document: pdfBuffer,          // archivo PDF "dummy"
          fileName: 'Demilove.pdf',     // nombre que se ve
          mimetype: 'application/pdf',  // tipo MIME para WhatsApp
          caption: menuTexto,           // texto del menú
          jpegThumbnail: thumb,         // preview del PDF
          mentions: [m.sender],         // mención al usuario
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
      console.error('Error en plugin menu.js:', e);
      await m.reply('💔 Demi avisa, algo salió mal al generar el menú...');
    }
  }
}