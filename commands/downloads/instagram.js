import fetch from 'node-fetch'

export default {
command: ['ig','instagram'],
category: 'downloads',

run: async (client, m, args) => {

if (!args[0]) {
return m.reply('Envíe un enlace de Instagram.')
}

if (!args[0].includes('instagram.com')) {
return m.reply('El enlace no es válido.')
}

try {

let api = `https://api.delirius.xyz/download/instagram?url=${encodeURIComponent(args[0])}`

let res = await fetch(api)
let json = await res.json()

if (!json.status) {
return m.reply('No se pudo obtener el contenido.')
}

let media = json.data[0].url

await client.sendMessage(m.chat,{
video:{ url: media },
mimetype:'video/mp4',
caption:'Video descargado de Instagram'
},{ quoted:m })

} catch (e) {
console.log(e)
m.reply('Error al descargar el contenido.')
}

}

}