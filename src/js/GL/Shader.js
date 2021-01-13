import * as THREE from 'three'
import GUI from '../utils/GUI.js'
import Raf from '../utils/RAF.js'
import viewport from '../utils/Viewport.js'

export default class Shader {
  constructor(
    engine,
    vert,
    frag,
    name,
    uniforms,
    params = {
      frame: true,
      terrain: false,
      viewport_factor: 1,
      hide_gui: false,
    }
  ) {
    this.$engine = engine
    this.$vert = vert
    this.$frag = frag
    this.$name = name
    this.$uniforms = uniforms
    this.$params = params

    this.viewport_factor = this.$params.viewport_factor

    if (this.$params.hide_gui) GUI.dat.GUI.toggleHide()

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

    if (this.$params.frame) this.setShaderPlane()

    if (this.$params.terrain) this.setTerrainPlane()

    this.setEvents()
  }

  setUniforms() {
    GUI.setFolder(this.$name)

    for (const key in this.$uniforms) {
      GUI.addValue(this.$name, `${key}`, {
        default: this.$uniforms[key].value,
        min: this.$uniforms[key].min ? this.$uniforms[key].min : 0,
        max: this.$uniforms[key].max ? this.$uniforms[key].max : 1,
        type: this.$uniforms[key].type ? this.$uniforms[key].type : 'other',
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
    console.log('cc')
    this.$engine.scene.add(this.plane)
  }

  setTerrainPlane() {
    let buff = new THREE.PlaneBufferGeometry(3000, 3000, 128, 128)
    buff.rotateX(-Math.PI / 2)
    this.plane = new THREE.Mesh(
      buff,
      new THREE.ShaderMaterial({
        uniforms: { ...this.$uniforms, ...this.defaultUniforms },
        vertexShader: this.$vert,
        fragmentShader: this.$frag,
        depthTest: false,
      })
    )

    this.plane.position.y = 0
    this.plane.position.z = 0
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
