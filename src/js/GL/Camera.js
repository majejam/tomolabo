import * as THREE from 'three'
import Raf from '../utils/RAF.js'
import CameraControls from 'camera-controls'

CameraControls.install({ THREE: THREE })

export default class Camera {
  constructor(Engine) {
    this.$engine = Engine

    this._update = this.update.bind(this)
    this.clock = new THREE.Clock()

    this.init()
  }

  init() {
    this.controls = new CameraControls(this.$engine.camera, this.$engine.renderer.domElement)
    this.controls.maxDistance = 2000

    Raf.add(this._update)
  }

  destroy() {
    this.removeEvents()
    Raf.remove(this._update)
  }

  update() {
    const delta = this.clock.getDelta()
    this.controls.update(delta)
  }
}
