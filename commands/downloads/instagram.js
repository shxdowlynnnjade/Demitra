import { instagramdl } from '@bochilteam/scraper'

export default {
  command: ['instagram', 'ig'],
  category: 'downloader',
  run: async (client, m, args, usedPrefix, command) => {

    if (!args[0]) {
      return m.reply('《✧》 Envíe un enlace de Instagram.')
    }

    if (!args[0].includes('instagram.com')) {
      return m.reply('《✧》 El enlace no es válido.')
    }

    try {

      const data = await instagramdl(args[0])

      if (!data || !data.length) {
        return m.reply('《✧》 No se pudo obtener el contenido.')
      }

      for (let media of data) {

        if (media.url.includes('.mp4')) {

          await client.sendMessage(
            m.chat,
            {
              video: { url: media.url },
              caption: `✦ Descarga de Instagram\n\n🔗 ${args[0]}`,
              mimetype: 'video/mp4',
              fileName: 'instagram.mp4'
            },
            { quoted: m }
          )

        } else {

          await client.sendMessage(
            m.chat,
            {
              image: { url: media.url },
              caption: `✦ Imagen de Instagram\n\n🔗 ${args[0]}`
            },
            { quoted: m }
          )

        }

      }

    } catch (e) {
      m.reply('《✧》 Error al descargar el contenido.')
      console.log(e)
    }

  }
}