/**
 * Webgl
 */
import Engine from '../GL/Engine'
import * as THREE from 'three'
import Post from '../GL/Post'

/**
 * Shaders
 */

import BarrelDistortion from '../shaders/post/BarrelDistortion.glsl'

export default {
  init() {
    new Post(new Engine(document.querySelector('.ps-1-c'), true), BarrelDistortion, 'ps-1', {
      u_k1: new THREE.Uniform(1.0),
      u_k2: new THREE.Uniform(0.0),
    })
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
}
