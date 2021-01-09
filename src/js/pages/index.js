import Engine from '../GL/Engine'
import Shader from '../GL/Shader'
import * as THREE from 'three'
import Post from '../GL/Post'

import vert1 from '../shaders/vert.glsl'
import frag1 from '../shaders/frag.glsl'
import frag2 from '../shaders/frag2.glsl'
import BarrelDistortion from '../shaders/post/BarrelDistortion.glsl'
import ChromaAbberation from '../shaders/post/ChromaAbberation.glsl'
import ChromaAbberation_2 from '../shaders/post/ChromaAbberation_2.glsl'
import ChromaBarrel from '../shaders/post/ChromaBarrel.glsl'
import Glitch from '../shaders/post/Glitch.glsl'
import Vignette from '../shaders/post/Vignette.glsl'

const engine_test = new Engine(document.querySelector('.sh-1-c'))
new Shader(
  engine_test,
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

new Post(engine_test, Glitch, 'ps-1-1', {
  u_amount: new THREE.Uniform(1.0),
})

new Shader(
  new Engine(document.querySelector('.sh-2-c')),
  vert1,
  frag2,
  'sh-2',
  {
    u_color_spacing: { value: -0.1 },
    u_color_brightness: { value: 0.3 },
    u_color_delta: { value: 1.4 },
    u_color_opacity: { value: 0.1 },
  },
  {
    viewport_factor: 4,
    hide_gui: false,
  }
)

new Post(new Engine(document.querySelector('.ps-1-c'), true), BarrelDistortion, 'ps-1', {
  u_k1: new THREE.Uniform(1.0),
  u_k2: new THREE.Uniform(0.0),
})

new Post(new Engine(document.querySelector('.ps-2-c'), true), ChromaAbberation, 'ps-2', {
  u_force: new THREE.Uniform(1.0),
})

new Post(new Engine(document.querySelector('.ps-3-c'), true), ChromaBarrel, 'ps-3', {
  u_amount: new THREE.Uniform(1.0),
  u_max_distort: new THREE.Uniform(2.2),
})

new Post(new Engine(document.querySelector('.ps-4-c'), true), Glitch, 'ps-4', {
  u_amount: new THREE.Uniform(1.0),
})

new Post(new Engine(document.querySelector('.ps-5-c'), true), ChromaAbberation_2, 'ps-5', {
  u_force: new THREE.Uniform(0.0),
})

new Post(new Engine(document.querySelector('.ps-6-c'), true), Vignette, 'ps-6', {
  u_offset: new THREE.Uniform(0.0),
  u_darkness: new THREE.Uniform(0.7),
})
