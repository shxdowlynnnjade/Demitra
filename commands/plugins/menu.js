// commands/plugins/menu.js
import fetch from 'node-fetch'

export default {
  command: ['menu', 'help', 'allmenu'], // comandos que activan este plugin
  category: 'main',                     // categoría
  description: 'Muestra el menú de comandos del bot',
  run: async (client, m, args, usedPrefix = '#') => {
    try {
      const botname = global.botname || 'Zero Two';
      const senderName = m.pushName || 'amig@';

      // URL de la imagen de portada
      const imageUrl = 'https://files.catbox.moe/s3gu8x.jpg';

      // Obtener la imagen como buffer y base64
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();
      const base64 = buffer.toString('base64');

      // Texto del menú
      const menuTexto = `ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
橫㈵𓂂ㅤㅤ𓐮𝖣ۣؗ𝖤ۣؗ𝖬ۣؗ𝖨ۣؗ𝖳ۣؗ𝖱ۣؗ𝖠ㅤㅤ▞ㅤㅤ𓆭𓆭₂₈₎
◯◯▸ㅤㅤ⎯⎯▬𝖫ؗOVEㅤㅤ🔘ㅤㅤ ▓█


⟍𝄄𝄄𝄄𝄄𝄄₂₈₎ㅤㅤ 🔲ㅤㅤ#𝖼𝗋𝖾𝖺𝗍𝗈𝗋ㅤㅤ⬤⬤⏋
> ㅤㅤㅤㅤ﹫Demitra(Adara) ㅤㅤ𔘓


ㅤ  𝗐𝖾𝗅𝖼𝗈𝗆𝖾ㅤ𝗌𝗈𝗒ㅤ𝗗᤻͟𝗲᤻͟𝗺᤻͟𝗶᤻͟𝗍᤻͟𝗋᤻͟𝗮᤻͟ㅤ𝗅𝖺ㅤ
ㅤ     𝗌𝗈𝗇𝗋𝗂𝗌𝖺ㅤ𝗁𝖾𝖼𝗁𝖺ㅤ𝖼͟𝗈᤻͟𝖽⵿𝗂𝗀᤻͟𝗈

ㅤ   𝖺ㅤ𝖼𝗈𝗇𝗍𝗂𝗇𝗎𝖺𝖼𝗂𝗈𝗇ㅤ𝗅𝖾ㅤ𝗆𝗎𝖾𝗌
ㅤㅤ   -𝗍𝗋𝗈ㅤ𝗆𝗂𝗌ㅤ𝖼⵿𝗈͟𝗆᤻͟𝖺᤻͟𝗇᤻͟𝖽᤻͟𝗈⵿𝗌


＿＿／ ㅤㅤ ◢Principal. ㅤㅤ  攤䥵𓌙

.reg
.menu/help/menú/allmenu
.infobot/infosocket
.status/estado
.report/reporte/sug/suggest


＿＿／ ㅤ ㅤ ◢Setperfi+   ㅤ  攤䥵𓌙

.profile/perfil
.setdescription/setdesc
.setpasatiempo
.sethobby
.setgenre (hombre/mujer) 
.marry/casarse @usuario
.divorce
.delpasatiempo
.delgenre
.removehobby
.level/lvl
.afk (estudiando, durmiendo, etc?)

 
＿＿／ ㅤ ㅤ ◢Groupㅤ ㅤ  攤䥵𓌙

.invite/invitar 
.hidetag/tag
.kick
.todos/invocar/tagall
.join link/unir link


＿＿／ ㅤ ㅤ ◢Stickers ㅤ ㅤ  攤䥵𓌙

.bratt/brat texto
.bratv
.emojimix (Stickers emoji 😂+🪻)
.qc texto (Stickers)
.sticker/s

＿＿／ ㅤ ㅤ ◢Extras+ㅤ ㅤ  攤䥵𓌙

.self
.logout (subbapagado) 
.reload (prendido) 
.qrs/codes
.pfp/getpic (fotos de perfil) 
.lboard/lb/leaderboard (Ordena usuarios por experiencia total.)
.hd/enhance/remini(Mejora calidad)
.inspect/inspeccionar (Funciona para tener info del grupo)
.readviewonce/read/rreadv/ver
.say/decir (Reenvía.)
.toimg /toimage (sticker a imagen)
.tourl (Convierte en url) 


／ ㅤ ㅤ ◢𝗋𝖺𝗆𝖽𝗈𝗆 ㅤ ㅤ  攤䥵𓌙

.translate/trad/traducir (Traduce) 
.ia/chatgpt


> ㅤㅤㅤㅤ@𝗉𝗋𝗈𝗑𝗂𝗆𝗈ㅤㅤ𔘓


▙▅▚ ㅤ ⇲𝖢ؗ𝖧ۣۤ𝖠ؗ𝖭ۖ𝖭ۤ𝖤ۣ𝖫ㅤ⦙⦙⦙◗ ㅤ 𓂧⁸⁶
> https://whatsapp.com/channel/0029VbBvrmwC1Fu5SYpbBE2A


ㅤㅤㅤㅤ𝖼𝗋𝖾𝖺𝗍𝗈𝗋ㅤㅤ𔘓ㅤㅤ𝗌𝗁𝖾𝗋𝗒𝗅
ㅤ`;

      // Enviar mensaje tipo "documento" con preview
      await client.sendMessage(
        m.chat,
        {
          document: buffer,
          mimetype: 'application/pdf',
          fileName: `Demilove.pdf`,
          caption: menuTexto,
          mentions: [m.sender],
          contextInfo: {
            externalAdReply: {
              title: '𝖣ۣؗ𝖤ۣؗ𝖬ۣؗ𝖨ۣؗ𝖳ۣؗ𝖱ۣؗ𝖠',
              body: 'BOMSHACALAKA💗',
              mediaType: 1,
              thumbnail: base64,
              renderLargerThumbnail: true,
              sourceUrl: 'https://whatsapp.com/channel/0029VbBvrmwC1Fu5SYpbBE2A'
            }
          }
        },
        { quoted: m }
      );

    } catch (e) {
      console.error('Error en plugin menu.js:', e);
      m.reply('💔 Demi dice que algo salió mal al generar el menú... prueba de nuevo.');
    }
  }
}