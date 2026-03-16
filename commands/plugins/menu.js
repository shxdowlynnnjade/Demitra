import fetch from 'node-fetch';
import PDFDocument from 'pdfkit';
import { Writable } from 'stream';
import fs from 'fs';

export default {
  command: ['menu','help','allmenu'],
  category: 'main',
  description: 'Muestra el menú de comandos del bot',
  run: async (client, m) => {
    try {
      // Descargar imagen
      const imageUrl = 'https://files.catbox.moe/s3gu8x.jpg';
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();

      // Crear PDF
      const doc = new PDFDocument();
      const chunks = [];
      doc.image(buffer, { fit: [500, 400], align: 'center', valign: 'center' });
      doc.end();
      for await (const chunk of doc) chunks.push(chunk);
      const pdfBuffer = Buffer.concat(chunks);

      // Texto
      const menuTexto = `Hola @${m.sender.split('@')[0]}, bienvenid@ a DemitraBot 🌸`;

      await client.sendMessage(
        m.chat,
        {
          document: pdfBuffer,
          mimetype: 'application/pdf',
          fileName: 'Archivo menu love.pdf',
          caption: menuTexto,
          mentions: [m.sender]
        },
        { quoted: m }
      );

    } catch (e) {
      console.error(e);
      m.reply('❌ Ocurrió un error al generar el menú.');
    }
  }
};