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

    this.bannedUniforms = ['enabled']

    this._update = this.update.bind(this)
    this.clock = new THREE.Clock()
    this.composer = new POST.EffectComposer(new THREE.WebGLRenderer())
    this.init()
  }

  init() {
    GUI.setFolder(this.$name)
    GUI.addValue(this.$name, 'enabled', {
      default: true,
    })

    this.setUniforms()

    this.setComposer()
    Raf.add(this._update)
  }

  destroy() {
    Raf.remove(this._update)
  }

  setUniforms() {
    for (const key in this.$uniforms) {
      GUI.addValue(this.$name, `${key}`, {
        default: this.$uniforms[key].value,
        step: 0.1,
      })
    }
  }

  setPass() {
    this.customEffect = new CustomEffect(this.$fragment, this.$uniforms)
    this.customEffect.blendMode.blendFunction = this.$blendMode
    this.pass = new POST.EffectPass(this.$engine.camera, this.customEffect)
  }

  setComposer() {
    this.setPass()
    this.composer = new POST.EffectComposer(this.$engine.renderer)
    this.composer.addPass(new POST.RenderPass(this.$engine.scene, this.$engine.camera))
    this.composer.addPass(this.pass)
  }

  events() {}

  update() {
    if (GUI.datas[this.$name].enabled) this.composer.render(this.clock.getDelta())

    for (const key in this.$uniforms) {
      if (!this.bannedUniforms.includes(key))
        this.customEffect.uniforms.get(key).value = GUI.datas[this.$name][key]
    }
  }
}

class CustomEffect extends POST.Effect {
  constructor(fragment, uniforms) {
    super('CustomEffect', fragment, {
      uniforms: new Map(Object.entries(uniforms)),
    })
  }
}
