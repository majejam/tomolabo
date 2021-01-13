class GUI {
  constructor() {
    this.dat = require('../../../node_modules/dat.gui')

    this.gui = new this.dat.GUI()

    this.folders = {}

    this.datas = {}

    this.gui.show()
    //this.dat.GUI.toggleHide()

    this.BlendFunction = {
      SKIP: 0,
      ADD: 1,
      ALPHA: 2,
      AVERAGE: 3,
      COLOR_BURN: 4,
      COLOR_DODGE: 5,
      DARKEN: 6,
      DIFFERENCE: 7,
      EXCLUSION: 8,
      LIGHTEN: 9,
      MULTIPLY: 10,
      DIVIDE: 11,
      NEGATION: 12,
      NORMAL: 13,
      OVERLAY: 14,
      REFLECT: 15,
      SCREEN: 16,
      SOFT_LIGHT: 17,
      SUBTRACT: 18,
    }
  }

  setFolder(name, parentFolder = null) {
    if (this.folders[name]) return this.warn(`The folder "${name}" already exist`)

    if (!parentFolder) this.folders[name] = this.gui.addFolder(name)
    else this.folders[name] = this.folders[parentFolder].addFolder(name)
    //adds key in datas object with folder name
    this.datas[name] = {}
  }

  getFolder(name) {
    return this.folders[name]
  }

  addValue(folderName, variableName, values, cb = () => {}) {
    this.checkValue(folderName, variableName)

    this.datas[folderName][variableName] = values.default

    this.setGuiType(folderName, variableName, values, cb)

    return this.datas[folderName][variableName]
  }

  checkValue(folderName, variableName) {
    if (!this.folders[folderName]) return this.warn(`The folder "${folderName}" doesn't exist`)
    if (this.datas[folderName][variableName])
      return this.warn(`The variable "${variableName}" already exist`)
  }

  setGuiType(folderName, variableName, values, cb) {
    if (this.getType(values) === 'color') this.setGuiColor(folderName, variableName, cb)
    else if (this.getType(values) === 'number')
      this.setGuiNumber(folderName, variableName, values, cb)
    else if (this.getType(values) === 'boolean') this.setGuiBoolean(folderName, variableName, cb)
  }

  setGuiNumber(folderName, variableName, values, cb) {
    this.folders[folderName]
      .add(this.datas[folderName], variableName, values.min, values.max, values.step)
      .onChange(cb)
  }

  setGuiBoolean(folderName, variableName, cb) {
    this.folders[folderName].add(this.datas[folderName], variableName).onChange(cb)
  }

  setGuiColor(folderName, variableName, cb) {
    this.folders[folderName].addColor(this.datas[folderName], variableName).onChange(cb)
  }

  getType(value) {
    if (value.type === 'color') return 'color'
    return typeof value.default
  }

  warn(msg) {
    console.warn(msg)
  }
}

let GUIInstance = new GUI()

export default GUIInstance
