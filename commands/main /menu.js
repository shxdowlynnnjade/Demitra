import { bodyMenu, menuObject } from '../../lib/commands.js';
import moment from 'moment-timezone';
import { getDevice } from '@whiskeysockets/baileys';

function normalize(text = '') {
  text = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
  return text.endsWith('s') ? text.slice(0, -1) : text;
}

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
      const botname = botSettings.botname || 'Bot';
      const namebot = botSettings.namebot || 'Bot';
      const banner = botSettings.banner || '';
      const owner = botSettings.owner || '';
      const canalId = botSettings.id || '';
      const canalName = botSettings.nameid || '';
      const link = botSettings.link || '';

      const isOficialBot = botId === global.client.user.id.split(':')[0] + '@s.whatsapp.net';
      const botType = isOficialBot ? 'Principal/Owner' : 'Sub Bot';
      const users = Object.keys(global.db.data.users).length;
      const device = getDevice(m.key.id);
      const senderName = global.db.data.users[m.sender]?.name || m.pushName || 'Sin nombre';

      // Categorías para filtrar
      const alias = {
        downloads: ['downloads', 'descargas'],
        grupo: ['grupo', 'group'],
        profile: ['profile', 'perfil'],
        sockets: ['sockets', 'bots'],
        utils: ['utils', 'utilidades', 'herramientas']
      };

      const input = normalize(args[0] || '');
      const cat = Object.keys(alias).find(k => alias[k].map(normalize).includes(input));
      const category = cat ? cat : '. *(˶ᵔ ᵕ ᵔ˶)*';

      if (args[0] && !cat) {
        return m.reply(`《✧》 La categoría *${args[0]}* no existe. Las categorías disponibles son: *${Object.keys(alias).join(', ')}*.\n> Para ver la lista completa escribe *${usedPrefix}menu*\n> Para ver los comandos de una categoría escribe *${usedPrefix}menu [categoría]*`);
      }

      // Construir contenido del menú
      const sections = menuObject;
      const content = cat ? String(sections[cat] || '') : Object.values(sections).map(s => String(s || '')).join('\n\n');
      let menu = bodyMenu + '\n\n' + content;

      // Reemplazar variables
      const replacements = {
        $owner: owner ? (global.db.data.users[owner]?.name || owner.split('@')[0]) : 'Oculto',
        $botType: botType,
        $device: device,
        $tiempo: tiempo,
        $tempo: tempo,
        $users: users.toLocaleString(),
        $link: link,
        $cat: category,
        $sender: senderName,
        $botname: botname,
        $namebot: namebot,
        $prefix: usedPrefix,
      };

      for (const [key, value] of Object.entries(replacements)) {
        menu = menu.replace(new RegExp(`\\${key}`, 'g'), value);
      }

      await client.sendMessage(m.chat, banner.endsWith('.mp4') || banner.endsWith('.webm') ? {
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
      await m.reply(`> Ocurrió un error inesperado al ejecutar el comando *${usedPrefix + command}*.\n> [Error: *${e.message}*]`);
    }
  }
};