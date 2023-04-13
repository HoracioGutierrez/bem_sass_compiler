# Changelog

## Version 1.0.0

### Added
- Added `fs-extra`, `path`, and `node-sass` dependencies
- Implemented `compileScss` function, which reads the input `.scss` file and compiles it into CSS
- Implemented `createBlockFolder` function, which creates a new folder for each block in the compiled CSS
- Implemented `createBlockFile` function, which creates a new CSS file for each block in the compiled CSS
- Implemented `createElementFolder` function, which creates a new folder for each element in a block in the compiled CSS
- Implemented `createElementFile` function, which creates a new CSS file for each element in a block in the compiled CSS
- Implemented `createModifierFolder` function, which creates a new folder for each modifier in the compiled CSS
- Implemented a utility function `createFile` inside `createModifierFolder` to create CSS files for modifiers
- Called `compileScss` function with a sample input file "test.scss"

### Changed

### Removed