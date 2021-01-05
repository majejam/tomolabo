import Engine from '../GL/Engine'
import Shader from '../GL/Shader'

import vert1 from '../shaders/vert.glsl'
import frag2 from '../shaders/frag2.glsl'

const engine = new Engine(document.querySelector('canvas'))

new Shader(
  engine,
  vert1,
  frag2,
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
