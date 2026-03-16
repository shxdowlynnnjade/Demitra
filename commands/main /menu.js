import { getDevice } from '@whiskeysockets/baileys';
import moment from 'moment-timezone';
delete require.cache[require.resolve('../../lib/commands.js')];
import { bodyMenu } from '../../lib/commands.js'; // Solo tu bodyMenu nuevo

export default {
  command: ['allmenu', 'help', 'menu'],
  category: 'info',
  run: async (client, m, args, usedPrefix, command) => {
    try {
      // Fechas y hora
      const now = new Date();
      const colombianTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Caracas' }));
      const tiempo = colombianTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/,/g, '');
      const tempo = moment.tz('America/Caracas').format('hh:mm A');

      // Datos del bot
      const botId = client?.user?.id.split(':')[0] + '@s.whatsapp.net';
      const botSettings = global.db.data.settings[botId] || {};
      const botname = botSettings.botname || '';
      const namebot = botSettings.namebot || '';
      const banner = botSettings.banner || '';
      const owner = botSettings.owner || '';
      const canalId = botSettings.id || '';
      const canalName = botSettings.nameid || '';

      const isOficialBot = botId === global.client.user.id.split(':')[0] + '@s.whatsapp.net';
      const botType = isOficialBot ? 'Principal/Owner' : 'Sub Bot';
      const users = Object.keys(global.db.data.users).length;
      const device = getDevice(m.key.id);
      const sender = global.db.data.users[m.sender]?.name || 'Usuario';
      const uptime = client.uptime ? formatUptime(Date.now() - client.uptime) : "Desconocido";

      // Construir mensaje solo con bodyMenu
      let menu = bodyMenu;

      // Reemplazos de variables
      const replacements = {
        $owner: owner || 'Oculto por privacidad',
        $botType: botType,
        $device: device,
        $tiempo: tiempo,
        $tempo: tempo,
        $users: users.toLocaleString(),
        $sender: sender,
        $botname: botname,
        $namebot: namebot,
        $prefix: usedPrefix,
        $uptime: uptime
      };

      for (const [key, value] of Object.entries(replacements)) {
        menu = menu.replace(new RegExp(`\\${key}`, 'g'), value);
      }

      // Enviar mensaje
      await client.sendMessage(m.chat, banner?.includes('.mp4') || banner?.includes('.webm') ? {
        video: { url: banner },
        gifPlayback: true,
        caption: menu,
        contextInfo: {
          mentionedJid: [m.sender],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: canalId,
            serverMessageId: '',
            newsletterName: canalName
          }
        }
      } : {
        text: menu,
        contextInfo: {
          mentionedJid: [m.sender],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: canalId,
            serverMessageId: '',
            newsletterName: canalName
          },
          externalAdReply: {
            title: botname,
            body: `${namebot}, By Adara`,
            showAdAttribution: false,
            thumbnailUrl: banner,
            mediaType: 1,
            previewType: 0,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

    } catch (e) {
      await m.reply(`> Error al ejecutar el comando *${usedPrefix + command}*.\n> [Error: *${e.message}*]`);
    }
  }
};

// Función de formateo de tiempo
function formatUptime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return [days && `${days}d`, `${hours % 24}h`, `${minutes % 60}m`, `${seconds % 60}s`].filter(Boolean).join(" ");
}