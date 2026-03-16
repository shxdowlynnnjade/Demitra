import { globalThis } from 'node:process'

const handler = async (m, { conn }) => {
  try {
    const botname = global.botname || global.botName || 'Zero Two'
    const comandos = Array.from(global.comandos.entries())

    // Agrupar por categoría
    const grouped = {}
    comandos.forEach(([cmd, data]) => {
      const cat = data.category || 'misc'
      if (!grouped[cat]) grouped[cat] = []
      grouped[cat].push(cmd)
    })

    // Crear texto de secciones
    const seccionesTexto = Object.entries(grouped)
      .map(([cat, cmds]) => `𖤐 *${cat.toUpperCase()}*\n${cmds.map(c => `  ꕦ ${c}`).join('\n')}`)
      .join('\n\n')

    // Saludo según hora en Bogotá
    const zonaHoraria = 'America/Bogota'
    const ahora = new Date()
    const hora = parseInt(ahora.toLocaleTimeString('es-CO', { timeZone: zonaHoraria, hour: '2-digit', hour12: false }))
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

    const menuTexto = `𖤐 ❖ 𝐙𝐄𝐑𝐎 𝐓𝐖𝐎'𝐒 𝐌𝐄𝐍𝐔 ❖ 𖤐
❝ ¡Hola *${m.pushName}*, ${saludo}~! ${carita}
Soy *${botname}* y este es mi menú,
úsalo sabiamente... hmph 💗 ❞

${seccionesTexto}
𖤐 ~Zero Two 🌸 (´｡• ᵕ •｡\`)`.trim()

    // Enviar mensaje
    await conn.sendMessage(m.chat, { text: menuTexto, mentions: [m.sender] }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('💔 Darling, algo salió mal al generar el menú...')
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'ayuda']
export default handler