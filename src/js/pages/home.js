import GUI from '../utils/GUI.js'
export default {
  init() {
    console.log('home')
    GUI.dat.GUI.toggleHide()
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
}
