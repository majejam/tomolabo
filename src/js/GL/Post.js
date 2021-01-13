import Raf from '../utils/RAF.js'
import * as THREE from 'three'
import * as POST from 'postprocessing'
import GUI from '../utils/GUI.js'

export default class Post {
  constructor(Engine, fragment, name, uniforms, blendMode = 13) {
    this.$engine = Engine
    this.$fragment = fragment
    this.$name = name
    this.$uniforms = uniforms
    this.$blendMode = blendMode

    this.bannedUniforms = ['enabled', 'opaciy']

    this._update = this.update.bind(this)
    this.clock = new THREE.Clock()
    this.composer = new POST.EffectComposer(new THREE.WebGLRenderer())
    this.init()
  }

  init() {
    this.setDefaultGUI(this.$name)

    this.setUniformsGUI()

    this.load().then(this.initialize.bind(this)).catch(console.error)

    Raf.add(this._update)
  }

  setDefaultGUI(name) {
    GUI.setFolder(name)
    GUI.addValue(name, 'enabled', {
      default: true,
    })
    GUI.addValue(name, 'opaciy', {
      default: 1,
      min: 0,
      max: 1,
    })
  }

  setUniformsGUI() {
    for (const key in this.$uniforms) {
      GUI.addValue(this.$name, `${key}`, {
        default: this.$uniforms[key].value,
        step: 0.1,
      })
    }
  }

  load() {
    /**
     * Step 1 : Load assets for SMAA pass
     */
    const assets = new Map()
    const loadingManager = new THREE.LoadingManager()
    const smaaImageLoader = new POST.SMAAImageLoader(loadingManager)

    return new Promise((resolve, reject) => {
      loadingManager.onLoad = () => resolve(assets)
      loadingManager.onError = reject

      smaaImageLoader.load(([search, area]) => {
        assets.set('smaa-search', search)
        assets.set('smaa-area', area)
      })
    })
  }

  initialize(assets) {
    /**
     * Step 2 : Load assets for SMAA pass
     */
    this.smaaEffect = new POST.SMAAEffect(assets.get('smaa-search'), assets.get('smaa-area'))
    this.setPass()
  }

  setPass() {
    /**
     * Step 3 : Setup pass with SMAA & Custom pass
     */
    this.customEffect = new CustomEffect(this.$fragment, this.$uniforms)
    this.customEffect.blendMode.blendFunction = this.$blendMode
    this.pass = new POST.EffectPass(this.$engine.camera, this.customEffect, this.smaaEffect)
    this.setComposer()
  }

  setComposer() {
    /**
     * Step 4 : Setup composer with previously declared pass
     */
    this.composer = new POST.EffectComposer(this.$engine.renderer)
    this.composer.addPass(new POST.RenderPass(this.$engine.scene, this.$engine.camera))
    this.composer.addPass(this.pass)
  }

  update() {
    if (GUI.datas[this.$name].enabled) this.composer.render(this.clock.getDelta())
    this.smaaEffect.blendMode.opacity.value = GUI.datas[this.$name]['opaciy']
    for (const key in this.$uniforms) {
      if (!this.bannedUniforms.includes(key))
        this.customEffect.uniforms.get(key).value = GUI.datas[this.$name][key]
    }
  }

  destroy() {
    Raf.remove(this._update)
  }
}

class CustomEffect extends POST.Effect {
  constructor(fragment, uniforms) {
    super('CustomEffect', fragment, {
      uniforms: new Map(Object.entries(uniforms)),
    })
  }
}
