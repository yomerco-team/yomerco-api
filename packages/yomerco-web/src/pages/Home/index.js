import React, { Component } from 'react'
import Header from '../../components/Header'
import CategorySection from '../../components/CategorySection'
import tienda from '../../assets/tienda.svg'
import logoAlt from '../../assets/logo-alt.svg'
import ProductCard from '../../components/ProductCard'
import {
  Container,
  Content,
  Section,
  Image,
  Title,
  ValueProposal,
  Subtitle,
  SectionTitle,
  SeeAll,
  FooterContent,
  FooterImage,
  FooterDescription,
  Copyright
} from './styles'

class Home extends Component {
  render () {
    const { data } = this.props
    const products = data.map((product) => {
      return (
        <ProductCard
          name={product.name}
          id={product.id}
          url={product.url}
          image={product.image}
          price={product.price}
          unit={product.unit}
          key={product.id}
        />
      )
    })
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
          {products}
          <SeeAll>
            Ver todos los productos
          </SeeAll>
          <CategorySection />
          <FooterContent>
            <FooterImage src={logoAlt} alt='alternative-logo-yomerco' />
            <FooterDescription>
            Sabemos que tus días son duros. Trabajar, estudiar, hacer pereza… Por eso
             hicimos Yo Merco, para que puedas realizar tu mercado sin salir de casa.
            </FooterDescription>
            <FooterDescription>
            Además, apoyamos al agro nacional vendiendo
            productos <b>producidos por campesinos colombianos.</b>
            </FooterDescription>
          </FooterContent>
          <Copyright>
            <b>yomerco.co</b> es una marca registrada - 2018.
          </Copyright>
        </Container>
      </Content>
    )
  }
}

export default Home
