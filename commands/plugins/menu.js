// commands/plugins/menu.js
export default {
  command: ['menu', 'help', 'allmenu'], // comandos que activan este plugin
  category: 'main',                     // categoría para organizar
  description: 'Muestra el menú de comandos del bot',
  run: async (client, m, args, usedPrefix = '#') => {
    try {
      const botname = global.botname || 'Zero Two';
      const senderName = m.pushName || 'amig@';
      const comandosCargados = Array.from(global.comandos.keys()).join(', ');

      // Saludo según hora
      const zonaHoraria = 'America/Bogota';
      const ahora = new Date();
      const hora = parseInt(ahora.toLocaleTimeString('es-CO', { timeZone: zonaHoraria, hour: '2-digit', hour12: false }));
      let saludo, carita;
      if (hora >= 5 && hora < 12) {
        saludo = 'buenos días';
        carita = '(＊^▽^＊) ☀️';
      } else if (hora >= 12 && hora < 18) {
        saludo = 'buenas tardes';
        carita = '(｡•̀ᴗ-)✧ 🌸';
      } else {
        saludo = 'buenas noches';
        carita = '(◕‿◕✿) 🌙';
      }

      // Texto del menú
      const menuTexto = `░▒ㅤ🌸ㅤ＃DEMILOVEㅤㅤ＞ㅤ                                       ૮₍´ ˶ ｪ ˵ ₎ა                            〘ㅤ☆ㅤ〙

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
https://whatsapp.com/channel/0029VbBvrmwC1Fu5SYpbBE2A`;

      // Enviar mensaje simple (texto)
      await client.sendMessage(m.chat, {
        text: menuTexto,
        mentions: [m.sender],
      }, { quoted: m });

    } catch (e) {
      console.error('Error en plugin menu.js:', e);
      m.reply('💔 Darling, algo salió mal al generar el menú...');
    }
  }
};