import Raf from '../utils/RAF.js'
import GUI from '../utils/GUI.js'
import Camera from './Camera'
import viewport from '../utils/Viewport.js'
import * as THREE from 'three'
export default class Engine {
  constructor(
    el,
    params = {
      camera: false,
      color: 0xffffff,
      cube: false,
    }
  ) {
    this.$el = el
    this.scene = null

    console.log(params)
    this.$params = params
    this.renderer = null
    this.THREE = THREE

    this._update = this.update.bind(this)
    this._onResize = this.onResize.bind(this)

    this.init()
  }

  init() {
    this.setupCamera()

    this.setupScene()

    if (this.$params.cube) this.setupCube()

    this.setupRenderer()

    this.onResize()

    if (this.$params.camera) new Camera(this)

    this.setEvents()
  }

  destroy() {
    this.removeEvents()
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(65, viewport.width / viewport.height, 0.1, 10000)
    this.camera.position.z = 2
  }

  setupScene() {
    this.scene = new THREE.Scene()
  }

  setupCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x857896 })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$el,
      powerPreference: 'high-performance',
      scene: this.scene,
      antialias: false,
      stencil: false,
      depth: false,
    })

    this.scene.background = new THREE.Color(this.$params.color)
  }

  onResize() {
    this.camera.aspect = viewport.width / viewport.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(viewport.width, viewport.height)
  }

  onMouseMove(event) {
    Raf.addOnce(
      function () {
        this._updateMouse(event)
      }.bind(this)
    )
  }

  updateMouse(event) {
    this.mouse.x = (event.clientX / viewport.width) * 2 - 1
    this.mouse.y = -(event.clientY / viewport.height) * 2 + 1
  }

  update() {
    this.renderer.render(this.scene, this.camera)
  }

  setEvents() {
    Raf.add(this._update)
    window.addEventListener('resize', this._onResize)
  }

  removeEvents() {
    Raf.remove(this._update)
    window.removeEventListener('resize', this._onResize)
  }
}
