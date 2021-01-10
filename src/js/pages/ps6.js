/**
 * Webgl
 */
import Engine from '../GL/Engine'
import * as THREE from 'three'
import Post from '../GL/Post'

/**
 * Shaders
 */

import Vignette from '../shaders/post/Vignette.glsl'

export default {
  init() {
    new Post(new Engine(document.querySelector('.ps-6-c'), true), Vignette, 'ps-6', {
      u_offset: new THREE.Uniform(0.0),
      u_darkness: new THREE.Uniform(0.7),
    })
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
}
