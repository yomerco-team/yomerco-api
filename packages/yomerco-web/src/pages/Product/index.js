import React, { Component } from 'react'
import Header from '../../components/Header'
import ProductCard from '../../components/ProductCard'
import {
  Container,
  Content
} from './styles'
import { Redirect } from 'react-router-dom'

class Product extends Component {
  render () {
    const { data } = this.props
    const { url } = this.props.match.params

    // eslint-disable-next-line
    const product = data.filter(product => {
      if (product.url === url) {
        return product
      }
    })

    if (typeof product[0] === 'undefined') {
      return <Redirect to='/error' />
    }

    return (
      <Content>
        <Header />
        <Container>
          <ProductCard
            name={product[0].name}
            id={product[0].id}
            url={product[0].url}
            image={product[0].image}
            price={product[0].price}
            unit={product[0].unit}
            key={product[0].id}
          />
        </Container>
      </Content>
    )
  };
}

export default Product
