import './styles/main.styl'

import './js/pages/index.js'

import Router from './js/utils/Router'
import common from './js/pages/index'
import home from './js/pages/home'
import sh1 from './js/pages/sh1'
import sh2 from './js/pages/sh2'
import ps1 from './js/pages/ps1'
import ps2 from './js/pages/ps2'
import ps3 from './js/pages/ps3'
import ps4 from './js/pages/ps4'
import ps5 from './js/pages/ps5'
import ps6 from './js/pages/ps6'

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  home,
  sh1,
  sh2,
  ps1,
  ps2,
  ps3,
  ps4,
  ps5,
  ps6,
})

// Load Events
document.addEventListener('DOMContentLoaded', () => routes.loadEvents())
