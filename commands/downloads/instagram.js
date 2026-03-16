import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {

if (!args[0]) throw 'Envíe un enlace de Instagram.'

if (!args[0].includes('instagram.com')) throw 'El enlace no es válido.'

let api = `https://api.nekolabs.my.id/downloader/instagram?url=${encodeURIComponent(args[0])}`

let res = await fetch(api)
let json = await res.json()

if (!json.success) throw 'No se pudo descargar el video.'

let video = json.result.downloadUrl[0]

await conn.sendMessage(
m.chat,
{
video: { url: video },
mimetype: 'video/mp4',
caption: 'Video descargado de Instagram'
},
{ quoted: m }
)

}

handler.help = ['ig <link>']
handler.tags = ['downloader']
handler.command = ['ig','instagram']

export default handler