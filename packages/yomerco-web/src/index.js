import React from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/Home'
import { injectGlobal } from 'styled-components'
import CircularBook from './assets/Fonts/circular-book.otf'
import CircularMedium from './assets/Fonts/circular-medium.otf'
import CircularBlack from './assets/Fonts/circular-black.otf'
import registerServiceWorker from './registerServiceWorker'

injectGlobal`
  @font-face {
    font-family: circular-book;
    src: url('${CircularBook}') format('opentype');
  }
  @font-face {
    font-family: circular-medium;
    src: url('${CircularMedium}') format('opentype');
  }
  @font-face {
    font-family: circular-black;
    src: url('${CircularBlack}') format('opentype');
  }
`

ReactDOM.render(<Home />, document.getElementById('root'))
registerServiceWorker()
