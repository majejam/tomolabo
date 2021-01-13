/**
 * Webgl
 */
import Engine from '../GL/Engine'
import Post from '../GL/Post'
import * as THREE from 'three'
import Shader from '../GL/Shader'
import TextureManager from '../GL/TextureManager'

/**
 * Shaders
 */

import ChromaBarrel from '../shaders/post/ChromaBarrel.glsl'
import vert from '../shaders/bg_vert.glsl'
import frag from '../shaders/bg_frag.glsl'

export default {
  init() {
    const textures = [{ name: 'gradientbg', url: '../images/shaders/bg-gradient.png' }]
    TextureManager.load(textures)

    const engine = new Engine(document.querySelector('.sh-3-c'), {
      camera: true,
      color: 0x000000,
      cube: false,
    })

    new Shader(
      engine,
      vert,
      frag,
      'sh-3',
      {
        gradient: { type: 't', value: TextureManager.get('gradientbg') },
        hGap: { type: 'f', value: 4.0, min: 0.0, max: 100 },
        u_gradiant: { type: 'f', value: 0.2 },
        u_color: { type: 'f', value: 1.0 },
      },
      {
        terrain: true,
        viewport_factor: 4,
        hide_gui: false,
      }
    )

    new Post(engine, ChromaBarrel, 'ps-3', {
      u_amount: new THREE.Uniform(1.0),
      u_max_distort: new THREE.Uniform(2.2),
    })
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
}
