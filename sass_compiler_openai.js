const fs = require('fs-extra');
const path = require('path');
const sass = require('node-sass');

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
      createBlockFolder(selectorName)
      createBlockFile(selectorName, rules)
    }
    if (element.test(selector)) {
      createElementFolder(selectorName)
      createElementFile(selectorName, rules)
    }
    if (modifier.test(selector)) {
      createModifierFolder(selectorName, rules)
    }
  }
};

function createBlockFolder(name) {
  console.log("New block : ", name)
  const blockFolder = path.join(__dirname, 'blocks')
  const blockFolderPath = path.join(blockFolder, name)
  fs.ensureDirSync(blockFolder)
  console.log(`Directory created for ${blockFolder}`)
  fs.ensureDirSync(blockFolderPath)
  console.log(`Directory created for ${blockFolderPath}`)
}

function createBlockFile(name, rules) {
  const blockFolder = path.join(__dirname, 'blocks')
  const blockFolderPath = path.join(blockFolder, name)
  const blockFilePath = path.join(blockFolderPath, name + '.css')
  fs.writeFileSync(blockFilePath, `.${name} {${rules}}`)
  console.log(`File created for ${blockFilePath}`)
}

function createElementFolder(name) {
  console.log("New element : ", name)
  const blockFolder = path.join(__dirname, 'blocks')
  const selectorParts = name.split("__")
  const blockFolderPath = path.join(blockFolder, selectorParts[0])
  const elementFolderPath = path.join(blockFolderPath, `__${selectorParts[1]}`)
  fs.ensureDirSync(elementFolderPath)
  console.log(`Directory created for ${elementFolderPath}`)
}

function createElementFile(name, rules) {
  const blockFolder = path.join(__dirname, 'blocks')
  const selectorParts = name.split("__")
  const blockFolderPath = path.join(blockFolder, selectorParts[0])
  const elementFolderPath = path.join(blockFolderPath, `__${selectorParts[1]}`)
  const elementFilePath = path.join(elementFolderPath, name + '.css')
  fs.writeFileSync(elementFilePath, `.${name} {${rules}}`)
}

function createModifierFolder(name, rules) {
  console.log("New modifier : ", name)
  const blockFolder = path.join(__dirname, 'blocks')
  let elementFolderPath = ""

  const hasElement = name.includes("__")

  if (hasElement) {
    const selectorParts = name.split("__")
    const blockFolderPath = path.join(blockFolder, selectorParts[0])
    const elementParts = selectorParts[1].split("_")

    for(let i = 1; i < elementParts.length ; i++){

      const elementFolder = path.join(blockFolderPath, `__${elementParts[0]}`)
      elementFolderPath = path.join(elementFolder, `_${elementParts[i]}`)
      fs.ensureDirSync(elementFolderPath)
      console.log(`Directory created for ${elementFolderPath}`)

      const modifierFilePath = path.join(elementFolderPath, name + ".css")
      fs.writeFileSync(modifierFilePath, `.${name} {${rules}}`)
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