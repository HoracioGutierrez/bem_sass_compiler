# SASS - BEM Compiler 🎉

Este repositorio ha sido creado específicamente para el curso de Desarrollador Web Fullstack de Practicum. A continuación, encontrarás instrucciones paso a paso sobre cómo implementar y utilizar este proyecto. ¡Diviértete!

## 🚀 Empezando

1. Primero, clona este repositorio en tu computadora local utilizando `git clone`:

```
git clone https://github.com/tu-usuario/practicum-bem.git
```

2. Luego, navega al directorio del proyecto:

```
cd practicum-bem
```

3. Instala las dependencias del proyecto ejecutando:

```
npm install
```

## 📚 Cómo utilizar

Una vez que hayas instalado las dependencias, puedes empezar a usar Practicum BEM para compilar tus archivos SCSS. Para hacerlo, sigue estos pasos:

1. Asegúrate de que tu archivo SCSS esté en la carpeta raíz del proyecto; si no existe puedes crearlo. Por ejemplo, puedes llamarlo `test.scss`.

2. Abre el archivo `sass_compiler.js` y modifica la última línea del código para que coincida con el nombre de tu archivo SCSS:

```javascript
compileScss("test.scss");
```

por :

```javascript
compileScss("mi-archivo.scss");
```

3. Ejecuta el siguiente comando en la terminal para compilar tus archivos SCSS:

```
node index.js
```

4. ¡Eso es todo! SASS-BEM Compiler generará automáticamente carpetas y archivos CSS siguiendo la metodología BEM.

## 🌟 Funciones

- Compila archivos SCSS y crea una estructura de carpetas siguiendo la metodología BEM de Practicum.
- Genera automáticamente carpetas y archivos CSS para bloques, elementos y modificadores.

## 📖 Referencia de funciones

### `compileScss(inputFile)`

Esta función toma un archivo SCSS como entrada y compila el archivo en CSS. Luego, analiza el CSS generado y crea carpetas y archivos CSS según la metodología BEM.

### `createBlockFolder(name)`, `createBlockFile(name, rules, folder)`

Estas funciones se utilizan para crear carpetas y archivos de bloques BEM.

### `createElementFolder(name)`, `createElementFile(name, rules, folder)`

Estas funciones se utilizan para crear carpetas y archivos de elementos BEM.

### `createModifierFolder(name, rules)`

Esta función se utiliza para crear carpetas y archivos de modificadores BEM.

## 📦 Dependencias

Este proyecto utiliza las siguientes dependencias:

- `fs-extra`: Permite trabajar con el sistema de archivos.
- `path`: Proporciona utilidades para trabajar con rutas de archivos y directorios.
- `node-sass`: Permite compilar archivos SCSS en CSS.
- `signale`: Ayuda a crear mensajes de registro agradables y con estilo en la terminal.

## 📝 TODO

- [ ] Agregar soporte para archivos SCSS que contengan más de una manera de escribir BEM.
- [ ] Terminar de agregar los loggers para todos los bloques de creacion.
- [ ] Refactorizar el bucle for.
- [ ] Refactorizar el proceso de busqueda para que tome selectores de SASS y no tenga que procesar a CSS para buscar selectores.

¡Disfruta de tu experiencia con Practicum BEM! 🎉