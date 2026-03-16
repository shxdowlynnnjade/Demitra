
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

const botname = global.botname || "DEMITRA"
const dev = global.dev || "Kalogeras"
const banner = global.banner || "https://adofiles.i11.eu/dl/oufl.jpg"
const channelRD = global.channelRD || { id: "0@newsletter", name: "DEMITRA Channel" }

let handler = async (m, { conn, usedPrefix, __dirname, participants }) => {
  try {

    let mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[m.sender] || {}
    let name = await conn.getName(m.sender)
    let totalreg = Object.keys(global.db.data.users).length
    let groupUserCount = m.isGroup ? participants.length : '-'
    let groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
    let uptime = clockString(process.uptime() * 1000)
    let fecha = new Date(Date.now())
    let locale = 'es-PE'
    let dia = fecha.toLocaleDateString(locale, { weekday: 'long' })
    let fechaTxt = fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let hora = fecha.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
    let totalCommands = Object.keys(global.plugins).length
    let readMore = String.fromCharCode(8206).repeat(4001)

    let userIdNum = m.sender.split('@')[0]
    let phone = PhoneNumber('+' + userIdNum)
    let pais = phone.getRegionCode() || 'Desconocido🐢'

    let tags = {
      'info': 'Info de demi 🐢',
      'main': 'Estado crazy',
      'menu': 'Mis datos',
      'search': 'Búsquedas',
      'descargas': 'descargas',
      'socket': 'Conexiónes aburrido.',
      'rg': 'Perfilll.',
      'fun': 'juegos happy',
      'rpg': 'Economía lol. ',
      'game': 'Fin de mi aburrimiento',
      'grupos': 'Lugar favorito',
      'nable': 'Modo on/off',
      'ia': 'Inteligencia, Gracias a Dios', 
      'sticker': 'Personalidad',
      'owner': 'Linda Adaara. Creadora mia'
    }

    let commands = Object.values(global.plugins)
      .filter(v => v.help && v.tags)
      .map(v => ({
        help: Array.isArray(v.help) ? v.help : [v.help],
        tags: Array.isArray(v.tags) ? v.tags : [v.tags]
      }))

    let menuTexto = ''
    for (let tag in tags) {
      let comandos = commands
        .filter(cmd => cmd.tags.includes(tag))
        .map(cmd => cmd.help.map(e => `*໒꒰՞ ܸ. .ܸ՞꒱ა     ۪    ׂ*  ${usedPrefix}${e}`).join('\n'))
        .join('\n')
      if (comandos) {
        menuTexto += `\n*╭──･ ̸̷∵* \`${tags[tag]}\`  *݁ 🐢*
${comandos}
*╰─────────────֙╯*\n`
      }
    }

    let date = `${dia}, ${fechaTxt}, ${hora}`
    let infoUser = `
░▒ㅤ🌸ㅤ＃𝖲𝖧𝖷𝖣𝖮𝖶𝖫YNㅤㅤ＞ㅤ                                       ૮₍´ ˶ ｪ ˵ ₎ა                            〘ㅤ☆ㅤ〙

                        𝐂𝐫𝐞𝐚𝐝𝐨𝐫 :: 
> ㅤㅤ    @Demitra(adara)

꒰ㅤ۪ㅤֺㅤ🪼੭ㅤ꧇ㅤBuenas tardes. Soy Demi, la sonrisa hecha código.

꒰  👾 ꧇ㅤLe muestro mis comandos. Ordenados y afilados.


        ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛   ୨୧  ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛


> ㅤㅤ⧼ㅤ Principalㅤ⧽ㅤ🫐❝
.reg
.menu/help/menú/allmenu
.infobot/infosocket
.status/estado
.report/reporte/sug/suggest



> ㅤㅤ⧼ㅤ Set perfil?+ㅤ⧽ㅤ🪼❝
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

> ㅤㅤ⧼ㅤ Grupo+ㅤ⧽ㅤ🍥❝
.invite/invitar 
.hidetag/tag
.kick
.todos/invocar/tagall
.join link/unir link

> ㅤㅤ⧼ㅤ Stickers+ㅤ⧽ㅤ🪼❝
.bratt/brat texto
.bratv
.emojimix (Stickers emoji 😂+🪻)
.qc texto (Stickers)
.sticker/s

> ㅤㅤ⧼ㅤ extras+ㅤ⧽ㅤ🍥❝
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

> ㅤㅤ⧼ㅤ Mas+ㅤ⧽ㅤ🪷❝
.translate/trad/traducir (Traduce) 
.ia/chatgpt

> ㅤㅤ⧼ㅤ Descargas+ㅤ⧽ㅤ🐢❝

.ytsearch/search (búsqueda en youtube) 
.play2/mp4/ytmp4/ytvideo/playvideo (videos descargados) 
.play/mp3/ytmp3 /ytaudio/playaudio (Música audio)
.tiktok / tt / tiktoksearch / ttsearch / tts (descarga y búsqueda) 
.pinterest/pin (busqueda) 
.instagram/ig
.mediafire/mf
.apk/aptoide/apkdl
.imagen/img/image(Google imágenes)

> © 2026 creado por Jade.

${readMore}
  🐢 *Simples comandos* 🔘\n`.trim()


   const icon = [
     'https://i.postimg.cc/rFfVL8Ps/image.jpg',
     'https://i.postimg.cc/rFfVL8Ps/image.jpg'
   ]
   let icons = icon[Math.floor(Math.random() * icon.length)]

  const Shadow_url = await (await fetch(icons)).buffer()
  const fkontak = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      productMessage: {
        product: {
          productImage: {
            mimetype: "image/jpeg",
            jpegThumbnail: Shadow_url
          },
          title: `> 𓈒    ׂ   🔮੭       ᮫  MENU DEMITRA ${botname} 🐢`,
          description: "« Soy yo loko,DEMITRA , fingiendo ser un simple extra. »",
          currencyCode: "USD",
          priceAmount1000: 0,
          retailerId: "menu"
        },
        businessOwnerJid: "584242773183@s.whatsapp.net"
      }
    }
  }

await m.react('🔥')
await conn.sendMessage(m.chat, { 
text: infoUser + menuTexto,
contextInfo: {
 isForwarded: true,
 forwardedNewsletterMessageInfo: {
   newsletterJid: channelRD.id,
   serverMessageId: '',
   newsletterName: channelRD.name
 },
 externalAdReply: {
   title: `${botname} ┊ Organización loko`,
   body: `Dirigido por ${dev}.`,
   mediaType: 1,
   mediaUrl: null,
   sourceUrl: null,
   thumbnail: await (await fetch(banner)).buffer(),
   showAdAttribution: false,
   containsAutoReply: true,
   renderLargerThumbnail: true
 }}}, { quoted: fkontak })

} catch (e) {
   console.error(e)
   await conn.sendMessage(m.chat, { 
     text: `🗣️ Un fallo ha surgido loko: ${e.message}`,
     mentionedJid: [mentionedJid]
   })
 }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú', 'allmenu']
handler.register = true
export default handler

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

function ucapan() {
  const time = moment.tz('America/Lima').format('HH')
  let res = "𝗕𝗎𝖾𝗇𝖺𝗌 𝗡𝗈𝖼𝗁𝖾𝗌, 𝗗𝖾𝗌𝖼𝖺𝗇𝗌𝖺."

  if (time >= 5 && time < 12)
    res = "𝗕𝗎𝖾𝗇𝗈𝗌 𝗗𝗂𝖺𝗌, ¿𝖢𝗈𝗆𝗈 𝖾𝗌𝗍𝖺𝗌? "
  else if (time >= 12 && time < 18)
    res = "𝗕𝗎𝖾𝗇𝖺𝗌 𝗧𝖺𝗋𝖽𝖾𝗌, ¿𝖰𝗎𝖾 𝗈𝗇𝖽𝖺? "
  else if (time >= 18)
    res = "𝗕𝗎𝖾𝗇𝖺𝗌 𝗡𝗈𝖼𝗁𝖾𝗌, ¿𝖼𝗈𝗆𝗈 𝖾𝗌𝗍𝗎𝗏𝗈 𝗍𝗎 𝖽𝗂́𝖺? 𝖣𝖾𝗌𝖼𝖺𝗇𝗌𝖺."

  return res
                         }