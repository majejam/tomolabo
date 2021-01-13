/**
 * Webgl
 */
import Engine from '../GL/Engine'
import Shader from '../GL/Shader'

/**
 * Shaders
 */

import vert1 from '../shaders/vert.glsl'
import frag2 from '../shaders/frag2.glsl'

export default {
  init() {
    new Shader(
      new Engine(document.querySelector('.sh-2-c')),
      vert1,
      frag2,
      'sh-2',
      {
        u_color_spacing: { value: -0.1, min: -1 },
        u_color_brightness: { value: 0.3 },
        u_color_delta: { value: 1.4 },
        u_color_opacity: { value: 0.1 },
        u_color: { value: { h: 350, s: 0.9, v: 0.3 }, type: 'color' },
      },
      {
        frame: true,
        viewport_factor: 4,
        hide_gui: false,
      }
    )
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
}
