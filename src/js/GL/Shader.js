import * as THREE from 'three'
import GUI from '../utils/GUI.js'
import Raf from '../utils/RAF.js'
import viewport from '../utils/Viewport.js'

export default class Shader {
  constructor(engine, vert, frag, uniforms) {
    this.$engine = engine
    this.$vert = vert
    this.$frag = frag
    this.$uniforms = uniforms

    this._update = this.update.bind(this)
    this._onResize = this.onResize.bind(this)

    this.init()
  }

  init() {
    GUI.setFolder('Uniforms')

    for (const key in this.$uniforms) {
      GUI.addValue('Uniforms', `${key}`, {
        default: this.$uniforms[key].value,
      })
    }

    this.$uniforms.u_resolution = {
      value: new THREE.Vector2(viewport.width * 4, viewport.height * 4),
    }
    this.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1.5),
      new THREE.ShaderMaterial({
        uniforms: this.$uniforms,
        vertexShader: this.$vert,
        fragmentShader: this.$frag,
      })
    )

    this.setEvents()
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
    this.$uniforms.u_resolution.value = new THREE.Vector2(viewport.width * 4, viewport.height * 4)
  }

  update() {
    GUI.datas.Uniforms['u_time'] += 0.004
    for (const key in this.$uniforms) {
      if (key != 'u_resolution') this.plane.material.uniforms[key].value = GUI.datas.Uniforms[key]
    }
  }
}
