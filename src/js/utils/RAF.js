class Raf {
  constructor(fps = 60) {
    this._listeners = []
    this._binded = false
    this._raf = null

    this.then = null
    this.tolerance = 0.1
    this.interval = 1000 / fps
  }

  bind() {
    if (this._binded === true) console.warn('Raf instance is already binded')

    this._binded = true
    this._update = this._update.bind(this)

    this.then = performance.now()

    this._raf = window.requestAnimationFrame(this._update)
  }

  unbind() {
    this._binded = false

    if (this._raf !== null) {
      window.requestAnimationFrame.cancel(this._raf)
      this._raf = null
    }

    this._listeners = []
  }

  add(callback, once = false) {
    if (typeof callback !== 'function')
      console.error('add() : Callback argument must be a function')

    const data = {
      id: this._listeners.length,
      callback,
      once,
    }

    this._listeners.push(data)

    if (!this._binded) {
      this.bind()
    }

    return data
  }

  addOnce(callback) {
    return this.add(callback, true)
  }

  remove(callback) {
    if (typeof callback !== 'function')
      console.error('remove() : Callback argument must be a function')

    for (let i = 0, l = this._listeners.length; i < l; i++) {
      if (this._listeners[i].callback === callback) {
        this._listeners.splice(i, 1)
        break
      }
    }
  }

  _update(timestamp) {
    const delta = timestamp - this.then
    if (delta >= this.interval - this.tolerance) {
      this.then = timestamp - (delta % this.interval)

      for (let i = 0; i < this._listeners.length; i++) {
        const data = this._listeners[i]

        data.callback()

        if (data.once) {
          this.remove(data.callback)
        }
      }
    }
    if (this._binded) {
      window.requestAnimationFrame(this._update)
    }
  }
}

const instanceRaf = new Raf()
Object.freeze(instanceRaf)

export default new Raf()
