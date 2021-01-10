/**
 * Webgl
 */
import Engine from '../GL/Engine'
import * as THREE from 'three'
import Post from '../GL/Post'

/**
 * Shaders
 */

import Glitch from '../shaders/post/Glitch.glsl'

export default {
  init() {
    new Post(new Engine(document.querySelector('.ps-4-c'), true), Glitch, 'ps-4', {
      u_amount: new THREE.Uniform(1.0),
    })
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
}
