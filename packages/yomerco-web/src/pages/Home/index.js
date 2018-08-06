import React, { Component } from 'react'
import Header from '../../components/Header'
import tienda from '../../assets/tienda.svg'
import ProductCard from '../../components/ProductCard'
import { Container, Content, Section, Image, Title, ValueProposal, Subtitle, SectionTitle } from './styles'

class Home extends Component {
  render () {
    return (
      <Content>
        <Header />
        <Container>
          <Section>
            <Image src={tienda} alt='YoMerco-image-mercado-tienda' />
            <ValueProposal>
              <Title>¡Apoyamos el agro colombiano!</Title>
              <Subtitle>Las frutas y verduras que te ofrecemos son producidas por nuestros campesinos locales.</Subtitle>
            </ValueProposal>
          </Section>
          <SectionTitle>
            Productos de temporada
          </SectionTitle>
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
