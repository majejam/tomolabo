/**
 * Webgl
 */
import Engine from '../GL/Engine'
import * as THREE from 'three'
import Post from '../GL/Post'

/**
 * Shaders
 */

import ChromaAbberation_2 from '../shaders/post/ChromaAbberation_2.glsl'

export default {
  init() {
    new Post(
      new Engine(document.querySelector('.ps-5-c'), {
        camera: true,
        color: 0xffffff,
        cube: true,
      }),
      ChromaAbberation_2,
      'ps-5',
      {
        u_force: new THREE.Uniform(0.0),
      }
    )
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
}
