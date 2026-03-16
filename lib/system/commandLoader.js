import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

global.comandos = new Map()
global.plugins = {}

const commandsFolder = path.join(process.cwd(), 'commands') // carpeta principal de comandos

/**
 * Carga todos los comandos recursivamente
 */
export async function loadCommands(dir = commandsFolder) {
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)

    // Si es carpeta, entrar recursivamente
    if (fs.lstatSync(fullPath).isDirectory()) {
      await loadCommands(fullPath)
      continue
    }

    // Solo archivos .js
    if (!item.endsWith('.js')) continue

    try {
      const modulePath = `${fullPath}?update=${Date.now()}`
      const imported = await import(modulePath)
      const comando = imported.default
      const pluginName = path.relative(commandsFolder, fullPath).replace(/\\/g, '/').replace('.js', '')

      global.plugins[pluginName] = imported

      // Verifica que tenga comandos válidos
      if (!comando?.command || typeof comando.run !== 'function') continue

      comando.command.forEach(cmd => {
        global.comandos.set(cmd.toLowerCase(), {
          pluginName,
          run: comando.run,
          category: comando.category || 'uncategorized',
          isOwner: comando.isOwner || false,
          isAdmin: comando.isAdmin || false,
          botAdmin: comando.botAdmin || false,
          info: comando.info || {}
        })
      })
    } catch (e) {
      console.error(chalk.red(`❌ Error cargando plugin ${item}:`), e)
    }
  }
  console.log(chalk.green('✅ Comandos cargados:'), Array.from(global.comandos.keys()))
}

/**
 * Recarga un archivo de comando específico
 */
globalThis.reload = async (_ev, filename) => {
  if (!filename || !filename.endsWith('.js')) return
  const fullPath = path.join(commandsFolder, filename)
  if (!fs.existsSync(fullPath)) return

  delete global.plugins[filename.replace('.js', '')]
  global.comandos.clear()
  await loadCommands()
}

// Observa cambios en la carpeta de comandos
fs.watch(commandsFolder, (event, filename) => {
  if (filename) globalThis.reload(event, filename)
})