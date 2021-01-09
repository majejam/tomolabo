import * as THREE from 'three'
import GUI from '../utils/GUI.js'
import Raf from '../utils/RAF.js'
import viewport from '../utils/Viewport.js'

export default class Shader {
  constructor(engine, vert, frag, name, uniforms, params) {
    this.$engine = engine
    this.$vert = vert
    this.$frag = frag
    this.$name = name
    this.$uniforms = uniforms

    this.viewport_factor = params.viewport_factor

    if (params.hide_gui) GUI.dat.GUI.toggleHide()

    this.defaultUniforms = {
      u_time: { value: 0.0 },
      u_resolution: {
        value: new THREE.Vector2(
          viewport.width * this.viewport_factor,
          viewport.height * this.viewport_factor
        ),
      },
    }

    this.bannedUniforms = ['u_resolution', 'u_time']

    this._update = this.update.bind(this)
    this._onResize = this.onResize.bind(this)

    this.init()
  }

  init() {
    this.setUniforms()

    this.setShaderPlane()

    this.setEvents()
  }

  setUniforms() {
    GUI.setFolder(this.$name)

    for (const key in this.$uniforms) {
      GUI.addValue(this.$name, `${key}`, {
        default: this.$uniforms[key].value,
      })
    }
  }

  setShaderPlane() {
    this.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1.5),
      new THREE.ShaderMaterial({
        uniforms: { ...this.$uniforms, ...this.defaultUniforms },
        vertexShader: this.$vert,
        fragmentShader: this.$frag,
      })
    )
    this.$engine.scene.add(this.plane)
  }

  setEvents() {
    Raf.add(this._update)
    window.addEventListener('resize', this._onResize)
  }

  removeEvents() {
    Raf.remove(this._update)
    window.removeEventListener('resize', this._onResize)
  }

  onResize() {
    this.defaultUniforms.u_resolution.value = new THREE.Vector2(
      viewport.width * this.viewport_factor,
      viewport.height * this.viewport_factor
    )
  }

  update() {
    this.plane.material.uniforms['u_time'].value += 0.004
    for (const key in this.$uniforms) {
      if (!this.bannedUniforms.includes(key))
        this.plane.material.uniforms[key].value = GUI.datas[this.$name][key]
    }
  }
}
