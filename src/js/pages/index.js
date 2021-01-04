import Engine from '../GL/Engine'
import Shader from '../GL/Shader'

import vert1 from '../shaders/vert.glsl'
import frag1 from '../shaders/frag.glsl'

Engine.init(document.querySelector('canvas'))

new Shader(Engine, vert1, frag1, {
  u_color_spacing: { value: 0.04 },
  u_color_brightness: { value: 0.3 },
  u_color_delta: { value: 1.38 },
  u_color_opacity: { value: 0.1 },
  u_time: { value: 0.1 },
})
