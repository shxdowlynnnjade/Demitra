import { getDevice } from '@whiskeysockets/baileys';
import moment from 'moment-timezone';
import { bodyMenu } from '../../lib/commands.js'; // Solo bodyMenu

export default {
  command: ['allmenu', 'help', 'menu'],
  category: 'info',
  run: async (client, m, args, usedPrefix, command) => {
    try {
      const now = new Date();
      const colombianTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Caracas' }));
      const tiempo = colombianTime.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/,/g, '');
      const tempo = moment.tz('America/Caracas').format('hh:mm A');

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
      const sender = global.db.data.users[m.sender].name;
      const uptime = client.uptime ? formatearMs(Date.now() - client.uptime) : "Desconocido";

      // Reemplazos de variables dentro de tu bodyMenu
      let menu = bodyMenu;
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
      await client.sendMessage(m.chat, banner.includes('.mp4') || banner.includes('.webm') ? {
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

function formatearMs(ms) {
  const segundos = Math.floor(ms / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  return [dias && `${dias}d`, `${horas % 24}h`, `${minutos % 60}m`, `${segundos % 60}s`].filter(Boolean).join(" ");
}