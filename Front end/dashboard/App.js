import Bio from '/dashboard/modules-dashboard/Bio.js'
import Gallery from '/dashboard/modules-dashboard/Gallery.js'
import Nav from '/dashboard/modules-dashboard/Nav.js'

const App = () => {
  return `
    ${Nav()}
    ${Bio()}
    ${Gallery()}  
  `
}

document.getElementById('root').innerHTML = App();