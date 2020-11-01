import React from 'react'
import { render } from 'react-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Error from './pages/404'
import { injectGlobal } from 'styled-components'
import CircularBook from './assets/Fonts/circular-book.otf'
import CircularMedium from './assets/Fonts/circular-medium.otf'
import CircularBlack from './assets/Fonts/circular-black.otf'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

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

const productData = [
  {
    id: 1,
    url: 'papa-capira-lavada',
    name: 'Papa capira lavada',
    unit: '500g',
    farm: 'Granja Las Palmas',
    image: 'https://jumbocolombiafood.vteximg.com.br/arquivos/ids/3323095-750-750/20386511-1.jpg',
    price: '$511'
  },
  {
    id: 2,
    url: 'avena-en-hojuelas-quaker',
    name: 'Avena en Hojuelas Quaker',
    unit: '200g',
    farm: 'Quaker',
    image: 'https://merquemas.com/wp-content/uploads/2018/02/avena-hojuelas-quaker-200-gr.jpg',
    price: '$1400'
  },
  {
    id: 3,
    url: 'tomate-chonto',
    name: 'Tomate Chonto',
    unit: '500g',
    farm: 'Granja Los tomaticos',
    image: 'http://www.practifruit.com/wp-content/uploads/2017/01/chonto.png',
    price: '$650'
  },
  {
    id: 4,
    url: 'banano-comun',
    name: 'Banano Común',
    unit: '500 gr',
    farm: 'Granja El Bananero',
    image: 'https://arcaikastore.com/541-large_default/banano-organico-x-6-unidades-frutas-organicas.jpg',
    price: '$730'
  },
  {
    id: 5,
    url: 'fresa-comun',
    name: 'Fresa Común',
    unit: '500 gr',
    farm: 'Granja Los Frutos Dulces',
    image: 'http://frutas.consumer.es/sites/default/files/fresa.jpg',
    price: '$2000'
  },
  {
    id: 6,
    url: 'granadilla-granja-frutos-dulces',
    name: 'Granadilla',
    unit: '500 gr',
    farm: 'Granja Los Frutos Dulces',
    image: 'https://i2.wp.com/www.escarola.co/wp-content/uploads/2015/09/granadilla-e1452365015349.jpg?fit=420%2C420&ssl=1',
    price: '$1200'
  },
  {
    id: 7,
    url: 'zanahoria-granaja-las-palmas',
    name: 'Zanahoria',
    unit: '500 gr',
    farm: 'Granja Las Palmas',
    image: 'https://plazacampesina.co/wp-content/uploads/2017/01/Zanahoria.png',
    price: '$500'
  },
  {
    id: 8,
    url: 'pepino-granja-maria',
    name: 'Pepino',
    unit: '500 gr',
    farm: 'Granja María',
    image: 'https://organicosysaludables.com/wp-content/uploads/2015/05/Pepino-cohombro-organico.jpg',
    price: '$820'
  },
  {
    id: 9,
    url: 'pina-oro-miel',
    name: 'Piña Oro Miel',
    unit: '500 gr',
    farm: 'Granja Las Frutas de mi tierra',
    image: 'http://laperlafruits.com/29-large_default/pina-oro-miel.jpg',
    price: '$640'
  }
]

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest)
  return (
    React.createElement(component, finalProps)
  )
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest)
    }} />
  )
}

render(
  <BrowserRouter>
    <Switch>
      <PropsRoute exact path='/producto' component={Home} data={productData} />
      <PropsRoute exact path='/producto/:url' component={Product} data={productData} />
      <PropsRoute exact path='/' component={Home} data={productData} />
      <PropsRoute path='/404' component={Error} />
      <PropsRoute component={Error} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
