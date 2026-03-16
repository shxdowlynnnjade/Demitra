import fetch from 'node-fetch'

export default {
command: ['ig','instagram'],
category: 'downloads',

run: async (client, m, args) => {

if (!args[0]) return m.reply('Envíe un enlace de Instagram.')
if (!args[0].includes('instagram.com')) return m.reply('Link inválido.')

try {

let api = `https://api.ryzendesu.vip/api/downloader/igdl?url=${encodeURIComponent(args[0])}`

let res = await fetch(api)
let json = await res.json()

if (!json.status) {
return m.reply('No se pudo obtener el video.')
}

let video = json.data[0].url

await client.sendMessage(
m.chat,
{
video: { url: video },
mimetype: 'video/mp4',
caption: 'Video descargado de Instagram'
},
{ quoted: m }
)

} catch (e) {
console.log(e)
m.reply('Error al descargar el video.')
}

}
}