import fetch from 'node-fetch'

export default {
  command: ['instagram', 'ig'],
  category: 'descargas',
  description: 'Descarga videos o imágenes de Instagram',
  
  run: async (client, m, args, usedPrefix, command) => {
    try {
      if (!args[0]) return client.reply(m.chat, '「✦」Por favor, proporciona un enlace válido de Instagram.', m)
      if (!args[0].match(/instagram\.com\/(p|reel|share|tv|stories)\//)) {
        return client.reply(m.chat, '「✦」El enlace no parece válido. Asegúrate de que sea de Instagram.', m)
      }

      await m.react('🕒')

      const data = await getInstagramMedia(args[0])
      if (!data) return client.reply(m.chat, 'No se pudo obtener el contenido del enlace.', m)

      const caption = `
Título: ${data.title || 'Desconocido'}
Descripción: ${data.caption || 'Sin descripción'}
Likes: ${data.like || 0}
Vistas: ${data.views || 0}
Comentarios: ${data.comment || 0}
Duración: ${data.duration || 'Desconocido'}
Link: ${args[0]}
      `.trim()

      if (data.type === 'video') {
        // Descarga el video como buffer
        const videoBuffer = await fetch(data.url)
          .then(res => res.arrayBuffer())
          .then(Buffer.from)

        await client.sendMessage(
          m.chat,
          { video: videoBuffer, caption, mimetype: 'video/mp4', fileName: 'instagram.mp4' },
          { quoted: m }
        )
      } else if (data.type === 'image') {
        await client.sendMessage(
          m.chat,
          { image: { url: data.url }, caption },
          { quoted: m }
        )
      } else {
        throw new Error('Contenido no soportado.')
      }

      await m.react('✔️')

    } catch (error) {
      await m.react('✖️')
      await client.reply(
        m.chat,
        `Ocurrió un error inesperado.\nUsa *${usedPrefix}report* para informarlo.\n\nDetalles: ${error.message}`,
        m
      )
    }
  }
}

// Función para obtener media de varias APIs
async function getInstagramMedia(url) {
  const apis = [
    {
      endpoint: `${global.APIs.vreden.url}/api/igdownload?url=${encodeURIComponent(url)}`,
      extractor: res => {
        if (!res.resultado?.respuesta?.datos?.length) return null
        const mediaUrl = res.resultado.respuesta.datos[0].url
        return { type: 'video', url: mediaUrl } // vreden devuelve solo videos
      }
    },
    {
      endpoint: `${global.APIs.delirius.url}/download/instagram?url=${encodeURIComponent(url)}`,
      extractor: res => {
        if (!res.status || !Array.isArray(res.data) || !res.data.length) return null
        const media = res.data[0]
        return { type: media.tipo === 'video' ? 'video' : 'image', url: media.url }
      }
    }
  ]

  for (const { endpoint, extractor } of apis) {
    try {
      const res = await fetch(endpoint).then(r => r.json())
      const result = extractor(res)
      if (result) return result
    } catch {}
    await new Promise(r => setTimeout(r, 500))
  }

  return null
}