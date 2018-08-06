import React, { Component } from 'react'
import Header from '../../components/Header'
import ProductCard from '../../components/ProductCard'
import { Container, Content } from './styles'

class Home extends Component {
  render () {
    return (
      <Content>
        <Header />
        <Container>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Container>
      </Content>
    )
  }
}

export default Home
