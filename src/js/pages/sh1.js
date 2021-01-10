/**
 * Webgl
 */
import Engine from '../GL/Engine'
import Shader from '../GL/Shader'
import * as THREE from 'three'
import Post from '../GL/Post'

/**
 * Shaders
 */

import vert1 from '../shaders/vert.glsl'
import frag1 from '../shaders/frag.glsl'
import Glitch from '../shaders/post/Glitch.glsl'

export default {
  init() {
    const engine = new Engine(document.querySelector('.sh-1-c'))
    new Shader(
      engine,
      vert1,
      frag1,
      'sh-1',
      {
        u_color_spacing: { value: 0.04 },
        u_color_brightness: { value: 0.3 },
        u_color_delta: { value: 1.38 },
        u_color_opacity: { value: 0.1 },
      },
      {
        viewport_factor: 4,
        hide_gui: false,
      }
    )

    new Post(engine, Glitch, 'ps-1-1', {
      u_amount: new THREE.Uniform(1.0),
    })
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
}
