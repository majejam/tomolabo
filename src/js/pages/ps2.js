/**
 * Webgl
 */
import Engine from '../GL/Engine'
import * as THREE from 'three'
import Post from '../GL/Post'

/**
 * Shaders
 */

import ChromaAbberation from '../shaders/post/ChromaAbberation.glsl'

export default {
  init() {
    new Post(new Engine(document.querySelector('.ps-2-c'), true), ChromaAbberation, 'ps-2', {
      u_force: new THREE.Uniform(4.0),
    })
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
}
