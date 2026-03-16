import fs from "fs"
import path from "path"
import chalk from "chalk"
import { fileURLToPath } from "url"
import { parse } from "@babel/parser"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Mapas globales para comandos y plugins
global.comandos = new Map()
global.plugins = {}

const commandsFolder = path.join(__dirname, "../../commands")

// Función para cargar todos los comandos recursivamente
async function seeCommands(dir = commandsFolder) {
  const items = fs.readdirSync(dir)
  
  for (const fileOrFolder of items) {
    const fullPath = path.join(dir, fileOrFolder)

    // Si es carpeta, recursión
    if (fs.lstatSync(fullPath).isDirectory()) {
      await seeCommands(fullPath)
      continue
    }

    // Solo archivos .js
    if (!fileOrFolder.endsWith(".js")) continue

    // Verificar sintaxis
    try {
      const code = fs.readFileSync(fullPath, "utf-8")
      parse(code, { sourceType: "module", plugins: ["topLevelAwait"] })
    } catch (err) {
      console.error(chalk.red(`❌ Error de sintaxis en ${fileOrFolder}:\n${err.message}`))
      continue
    }

    // Importar y registrar
    try {
      const modulePath = `${path.resolve(fullPath)}?update=${Date.now()}`
      const imported = await import(modulePath)
      const comando = imported.default
      const pluginName = path.relative(commandsFolder, fullPath).replace(/\\/g, "/").replace(".js", "")
      global.plugins[pluginName] = imported

      if (!comando?.command || typeof comando.run !== "function") continue

      comando.command.forEach(cmd => {
        global.comandos.set(cmd.toLowerCase(), {
          pluginName,
          run: comando.run,
          category: comando.category || "uncategorized",
          isOwner: comando.isOwner || false,
          isAdmin: comando.isAdmin || false,
          botAdmin: comando.botAdmin || false,
          before: imported.before || null,
          after: imported.after || null,
          info: comando.info || {}
        })
      })

    } catch (e) {
      console.error(chalk.red(`❌ Error cargando el plugin ${fileOrFolder}:`), e)
    }
  }

  // Mostrar comandos cargados
  console.log(chalk.green("✅ Comandos cargados:"), Array.from(global.comandos.keys()))
}

// Recarga dinámica de plugins
globalThis.reload = async (_ev, filename) => {
  if (!filename || !filename.endsWith(".js")) return

  const fullPath = path.join(commandsFolder, filename)
  if (!fs.existsSync(fullPath)) {
    console.log(chalk.yellow(`⚠ Plugin eliminado: ${filename}`))
    delete global.plugins[filename.replace(".js", "")]
    global.comandos.clear()
    await seeCommands()
    return
  }

  try {
    const code = fs.readFileSync(fullPath, "utf-8")
    parse(code, { sourceType: "module", plugins: ["topLevelAwait"] })
  } catch (err) {
    console.error(chalk.red(`❌ Error de sintaxis en '${filename}'\n${err.message}`))
    return
  }

  try {
    const modulePath = `${fullPath}?update=${Date.now()}`
    const imported = await import(modulePath)
    global.plugins[filename.replace(".js", "")] = imported
    global.comandos.clear()
    await seeCommands()
  } catch (e) {
    console.error(chalk.red(`❌ Error al recargar ${filename}:\n`), e)
  }
}

Object.freeze(globalThis.reload)

// Observa cambios en toda la carpeta de comandos
fs.watch(commandsFolder, { recursive: true }, (event, filename) => {
  if (filename) globalThis.reload(event, filename)
})

export default seeCommands