import fs from 'fs'
import { database } from '../lib/database.js'
import fetch from 'node-fetch'
import { globalComandos } from '../lib/mainLoader.js' // si tienes tu loader main

// bodyMenu base, puede venir de otro archivo
import { bodyMenu } from '../lib/commands.js'

const handler = async (m, { conn, usedPrefix }) => {
  try {
    const botname = global.botname || 'Zero Two'
    const senderName = global.db.data.users[m.sender]?.name || m.pushName || 'Sin nombre'

    // Agrupar comandos por categoría
    const grouped = {}
    for (const [cmd, info] of global.comandos) {
      const cat = info.category || 'otros'
      if (!grouped[cat]) grouped[cat] = []
      grouped[cat].push(cmd)
    }

    const seccionesTexto = Object.entries(grouped)
      .map(([cat, cmds]) => `𖤐 *${cat.toUpperCase()}*\n${cmds.map(c => `  ꕦ ${c}`).join('\n')}`)
      .join('\n\n')

    // Saludo según hora
    const horaActual = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', hour12: false })
    const hora = parseInt(horaActual.split(':')[0])
    let saludo, carita
    if (hora >= 5 && hora < 12) {
      saludo = 'buenos días'
      carita = '(＊^▽^＊) ☀️'
    } else if (hora >= 12 && hora < 18) {
      saludo = 'buenas tardes'
      carita = '(｡•̀ᴗ-)✧ 🌸'
    } else {
      saludo = 'buenas noches'
      carita = '(◕‿◕✿) 🌙'
    }

    // Reemplazos de bodyMenu
    let menuTexto = bodyMenu
      ? bodyMenu + '\n\n' + seccionesTexto
      : `𖤐 ❖ 𝐌𝐄𝐍𝐔 ❖ 𖤐
¡Hola *${senderName}*, ${saludo}~! ${carita}
Soy *${botname}* y este es mi menú:

ꙮ Comandos: ${global.comandos.size} disponibles
ꙮ Usuarios: ${Object.keys(database.data.users || {}).length} conocidos
ꙮ Registrados: ${Object.values(database.data.users || {}).filter(u => u.registered).length}

${seccionesTexto}
𖤐 ~Zero Two 🌸`

    // Reemplazar variables dinámicas en bodyMenu
    const replacements = {
      $owner: global.db.data.settings?.owner || 'Oculto',
      $prefix: usedPrefix,
      $botname: botname,
      $sender: senderName,
      $users: Object.keys(database.data.users || {}).length,
    }

    for (const [key, value] of Object.entries(replacements)) {
      menuTexto = menuTexto.replace(new RegExp(`\\${key}`, 'g'), value)
    }

    await conn.sendMessage(m.chat, { text: menuTexto, mentions: [m.sender] }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('💔 Algo salió mal al generar el menú... prueba de nuevo~')
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'ayuda']

export default handler