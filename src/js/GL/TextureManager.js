import * as THREE from 'three'

class TextureManager {
  constructor() {
    this.loadingManager = new THREE.LoadingManager()
    this.loadingManager.onLoad = this.loaded.bind(this)
    this.loadingManager.onError = function (url) {
      console.error('Texture', url)
    }

    this.loader = new THREE.TextureLoader(this.loadingManager)
    this.textures = []
  }

  load(textures) {
    textures.forEach(texture => {
      this.textures.push(texture)
      this.textures[this.textures.length - 1].texture = this.loader.load(texture.url)
    })
  }

  get(name) {
    let t

    this.textures.forEach(function (el) {
      if (el.name == name) {
        t = el.texture
      }
    })

    return t
  }

  loaded() {
    console.log('Loaded')
  }
}

const TextureManagerInstance = new TextureManager()

export default TextureManagerInstance
