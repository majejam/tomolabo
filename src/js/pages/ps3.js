/**
 * Webgl
 */
import Engine from '../GL/Engine'
import * as THREE from 'three'
import Post from '../GL/Post'

/**
 * Shaders
 */

import ChromaBarrel from '../shaders/post/ChromaBarrel.glsl'

export default {
  init() {
    new Post(
      new Engine(document.querySelector('.ps-3-c'), {
        camera: true,
        color: 0xffffff,
        cube: true,
      }),
      ChromaBarrel,
      'ps-3',
      {
        u_amount: new THREE.Uniform(1.0),
        u_max_distort: new THREE.Uniform(2.2),
      }
    )
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
}
