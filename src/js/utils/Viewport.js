class Viewport {
  constructor() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this._onResize = this.onResize.bind(this)

    window.addEventListener('resize', this._onResize)
  }

  onResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
  }
}

const instanceViewport = new Viewport()

export default instanceViewport
