import fetch from 'node-fetch'

export default {
command: ['ig','instagram'],
category: 'downloads',

run: async (client, m, args) => {

if (!args[0]) return m.reply('Envíe un enlace de Instagram.')
if (!args[0].includes('instagram.com')) return m.reply('El enlace no es válido.')

try {

let video = null

// API 1
try {
let r = await fetch(`https://api.delirius.xyz/download/instagram?url=${encodeURIComponent(args[0])}`)
let j = await r.json()
if (j.status && j.data?.length) {
video = j.data[0].url
}
} catch {}

// API 2 (respaldo)
if (!video) {
try {
let r = await fetch(`https://api.nekolabs.my.id/downloader/instagram?url=${encodeURIComponent(args[0])}`)
let j = await r.json()
if (j.success && j.result?.downloadUrl?.length) {
video = j.result.downloadUrl[0]
}
} catch {}
}

if (!video) {
return m.reply('No se pudo obtener el video.')
}

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
m.reply('Error al descargar el contenido.')
}

}
}