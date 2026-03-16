// commands/plugins/menu.js
export default {
  command: ['menu', 'help', 'allmenu'], // comandos que activan este plugin
  category: 'main',                     // categoría para organizar
  description: 'Muestra el menú de comandos del bot',
  run: async (client, m, args, usedPrefix = '#') => {
    try {
      const botname = global.botname || 'Zero Two';
      const senderName = m.pushName || 'amig@';
      const comandosCargados = Array.from(global.comandos.keys()).join(', ');

      // Saludo según hora
      const zonaHoraria = 'America/Bogota';
      const ahora = new Date();
      const hora = parseInt(ahora.toLocaleTimeString('es-CO', { timeZone: zonaHoraria, hour: '2-digit', hour12: false }));
      let saludo, carita;
      if (hora >= 5 && hora < 12) {
        saludo = 'buenos días';
        carita = '(＊^▽^＊) ☀️';
      } else if (hora >= 12 && hora < 18) {
        saludo = 'buenas tardes';
        carita = '(｡•̀ᴗ-)✧ 🌸';
      } else {
        saludo = 'buenas noches';
        carita = '(◕‿◕✿) 🌙';
      }

      // Texto del menú
      const menuTexto = `𖤐 ❖ 𝐙𝐄𝐑𝐎 𝐓𝐖𝐎'𝐒 𝐌𝐄𝐍𝐔 ❖ 𖤐
❝ ¡Hola ${senderName}, ${saludo}~! ${carita}
Soy *${botname}* y este es mi menú:
${comandosCargados}
𖤐 ~Zero Two 🌸 (´｡• ᵕ •｡\`)`;

      // Enviar mensaje simple (texto)
      await client.sendMessage(m.chat, {
        text: menuTexto,
        mentions: [m.sender],
      }, { quoted: m });

    } catch (e) {
      console.error('Error en plugin menu.js:', e);
      m.reply('💔 Darling, algo salió mal al generar el menú...');
    }
  }
};