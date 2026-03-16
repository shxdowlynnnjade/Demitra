// commands/plugins/menu.js
export default {
  command: ['menu', 'help', 'allmenu'],
  category: 'main',
  description: 'Muestra el menú de comandos del bot',
  run: async (client, m, args, usedPrefix = '#') => {
    try {
      const botname = global.botname || 'Zero Two';
      const senderName = m.pushName || 'amig@';
      // ... tu lógica de saludo aquí ...

      const menuTexto = `... tu texto completo del menú aquí ...`;

      // URL de la imagen que quieres mostrar
      const imageUrl = 'https://tu-imagen-aqui.jpg'; // <-- reemplaza con la URL de tu imagen

      // Mensaje con imagen
      await client.sendMessage(m.chat, {
        image: { url: imageUrl }, // la imagen adjunta
        caption: menuTexto,       // el texto del menú
        mentions: [m.sender],
        footer: '🌸 Zero Two',     // opcional
        templateButtons: [         // aquí agregamos un botón que abra tu canal
          { urlButton: { displayText: 'Canal', url: 'https://whatsapp.com/channel/0029VbBvrmwC1Fu5SYpbBE2A' } }
        ]
      }, { quoted: m });

    } catch (e) {
      console.error('Error en plugin menu.js:', e);
      m.reply('💔 Darling, algo salió mal al generar el menú...');
    }
  }
};