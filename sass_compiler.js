const fs = require('fs-extra');
const path = require('path');
const sass = require('node-sass');
const {Signale} = require('signale')

const blockFolder = path.join(__dirname, 'blocks')
const logger = new Signale()
const blockFolderLogger = logger.scope("block","folder")
const blockFileLogger = blockFolderLogger.scope("block","file")
const elementFolderLogger = logger.scope("element","folder")
const elementFileLogger = elementFolderLogger.scope("element","file")
const modifierFolderLogger = logger.scope("modifier","folder")
const modifierFileLogger = modifierFolderLogger.scope("modifier","file")

logger.pending("Running Practicum BEM compilation...")

const compileScss = (inputFile) => {
  const cssResult = sass.renderSync({ file: inputFile });
  const css = cssResult.css.toString();
  const regex = /\.([^{]+)(__[\w]*)?\s?{[^}]*}/g;
  let match;

  while ((match = regex.exec(css)) !== null) {

    const selector = match[0].split('{')[0].trim()
    const selectorName = selector.replace(/^\./, '')
    const rules = match[0].split('{')[1].split('}')[0].trim()

    const block = /\.([^{_]+)$/
    const element = /\.([^{_]+)__([^{_]+)$/
    const modifier = /\.([^{_]+)(__[^{_]+)?(_([^{_])+)(_([^{_])+)?$/

    if (block.test(selector)) {
      const folderPath = createBlockFolder(selectorName)
      createBlockFile(selectorName, rules,folderPath)
    }
    if (element.test(selector)) {
      const folderPath = createElementFolder(selectorName)
      createElementFile(selectorName, rules,folderPath)
    }
    if (modifier.test(selector)) {
      createModifierFolder(selectorName, rules)
    }
  }
};

//Crea un directorio pasandole el path completo
function createFolder(name){
  fs.ensureDirSync(name)
}

//Crea un archivo pasandole el path completo y el contenido del archivo
function createFile(name, content){
  fs.writeFileSync(name, content)
}

//Tiene la logica para extraer el nombre del directorio de un bloque y crearlo
function createBlockFolder(name) {
  
  //Logger del nivel de bloque BEM
  
  blockFolderLogger.pending("Creating new block folder...")

  //Path del directorio del bloque
  const blockFolderPath = path.join(blockFolder, name)
  createFolder(blockFolderPath)
  blockFolderLogger.success(`Directory created for ${blockFolderPath}`)
  return blockFolderPath
}

function createBlockFile(name, rules,folder) {

  //Logger del nivel de bloque BEM
  blockFileLogger.pending("Creating new block file...")

  //Path del archivo del bloque
  const blockFilePath = path.join(folder, name + '.css')
  const content = `.${name} {${rules}}`
  createFile(blockFilePath,content)
  blockFileLogger.success(`File created for ${blockFilePath}`)
}

function createElementFolder(name) {

  //Logger del nivel de elemento BEM
  elementFolderLogger.pending("Creating new element folder...")

  //Path del directorio del elemento
  const selectorParts = name.split("__")
  const blockFolderPath = path.join(blockFolder, selectorParts[0])
  const elementFolderPath = path.join(blockFolderPath, `__${selectorParts[1]}`)
  createFolder(elementFolderPath)
  elementFolderLogger.success(`Directory created for ${elementFolderPath}`)
  return elementFolderPath
}

function createElementFile(name, rules,folder) {
  //Logger del nivel de elemento BEM
  elementFileLogger.pending("Creating new element file...")
  //El contenido del archivo
  const content = `.${name} {${rules}}`
  //Path del archivo del elemento
  const elementFilePath = path.join(folder, name + '.css')
  createFile(elementFilePath,content)
  elementFileLogger.success(`File created for ${elementFilePath}`)
}

function createModifierFolder(name, rules) {

  //Logger del nivel de modificador BEM
  modifierFolderLogger.pending("Creating new modifier folder...")


  let elementFolderPath = ""
  const hasElement = name.includes("__")

  if (hasElement) {
    const selectorParts = name.split("__")
    const blockFolderPath = path.join(blockFolder, selectorParts[0])
    const elementParts = selectorParts[1].split("_")

    for(let i = 1; i < elementParts.length ; i++){

      const elementFolder = path.join(blockFolderPath, `__${elementParts[0]}`)
      elementFolderPath = path.join(elementFolder, `_${elementParts[i]}`)
      
      createFolder(elementFolderPath)
      modifierFolderLogger.success(`File created for ${elementFolderPath}`)

      //El contenido 
      const content = `.${name} {${rules}}`

      const modifierFilePath = path.join(elementFolderPath, name + ".css")
      
      createFile(modifierFilePath, content)
      console.log(`File created for ${modifierFilePath}`)

    }
  } else {
    createFile()
  }

  function createFile() {
    const selectorParts = name.split("_")
    const blockFolderPath = path.join(blockFolder, selectorParts[0])

    for (let i = 1; i < selectorParts.length; i++) {
      elementFolderPath = path.join(blockFolderPath, `_${selectorParts[i]}`)

      const modifierFilePath = path.join(elementFolderPath, name + ".css")
      fs.ensureDirSync(elementFolderPath)
      fs.writeFileSync(modifierFilePath, `.${name} {${rules}}`)
    }
  }

  console.log(`Directory created for ${elementFolderPath}`)

}

compileScss("test.scss")