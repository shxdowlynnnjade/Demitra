import fetch from 'node-fetch';
import Jimp from 'jimp';

const handler = async (m, { conn }) => {
  try {
    // URL de la imagen de portada
    const imageUrl = 'https://files.catbox.moe/s3gu8x.jpg';

    // Descargar la imagen y convertirla en buffer
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    // Redimensionar la imagen para thumbnail (300x150)
    const thumb = await Jimp.read(buffer)
      .then(img => img.resize(300, 150).getBufferAsync(Jimp.MIME_JPEG))
      .catch(() => buffer); 

    // Datos dinámicos
    const userName = '@' + m.sender.split('@')[0];
    const botName = await conn.getName(conn.user?.id || conn.user?.jid || '');
    const greeting = (() => {
      const h = new Date().getHours();
      return h < 12 ? 'Buenos días 🌅' : h < 18 ? 'Buenas tardes 🌤' : 'Buenas noches 🌙';
    })();

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

    // Flow interactivo con botones
    const flowMessage = {
      header: { documentMessage: { url: 'https://mmg.whatsapp.net/v/t62...', mimetype: 'application/pdf', fileName: 'Menu2Demitralove.pdf', jpegThumbnail: thumb } },
      body: { text: '' },
      footer: { text: menuTexto },
      nativeFlowMessage: {
        buttons: [
          { name: 'single_select', buttonParamsJson: '{"title":"Menú Completo","sections":[{"title":"Demitrabot","rows":[{"title":"ia":".chatgpt"},{"title":"Info Bot","id":".infobot"},{"title":"Menu All","id":".allmenu"}]}]}' },
          { name: 'cta_url', buttonParamsJson: '{"display_text":"Canal de WhatsApp","url":"https://whatsapp.com/channel/0029VbBvrmwC1Fu5SYpbBE2A"}' }
        ]
      }
    };

    // Enviar mensaje
    await conn.relayMessage(
      m.chat,
      { viewOnceMessage: { message: { interactiveMessage: flowMessage } } },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al generar el menú.');
  }
};

handler.help = ['menulist'];
handler.tags = ['main'];
handler.command = ['mls','menulist'];
export default handler;