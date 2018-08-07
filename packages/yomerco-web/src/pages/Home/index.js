import React, { Component } from 'react'
import Header from '../../components/Header'
import tienda from '../../assets/tienda.svg'
import logoAlt from '../../assets/logo-alt.svg'
import ProductCard from '../../components/ProductCard'
import {
  Container,
  Content, Section,
  Image,
  Title,
  ValueProposal,
  Subtitle,
  SectionTitle,
  SeeAll,
  CategoryContainer,
  CategoryContent,
  CategoryText,
  CategoryImage,
  FooterContent,
  FooterImage,
  FooterDescription,
  Copyright
} from './styles'

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
          <SeeAll>
            Ver todos los productos
          </SeeAll>
          <SectionTitle>
            Otras categorías
          </SectionTitle>
          <CategoryContent>
            <CategoryContainer>
              <CategoryImage src='https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201706/15/00202002800106____1__600x600.jpg' alt='YoMerco-categoria-verduras' />
              <CategoryText>
              Verduras
              </CategoryText>
            </CategoryContainer>
            <CategoryContainer>
              <CategoryImage src='https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201703/15/00118104500022____2__600x600.jpg' alt='YoMerco-categoria-frutas' />
              <CategoryText>
              Frutas
              </CategoryText>
            </CategoryContainer>
            <CategoryContainer>
              <CategoryImage src='https://s3-us-west-2.amazonaws.com/mercadoni/live/e6a6f9c379333b3155d5ab425467c7c04ff8b05c/medium_e6a6f9c379333b3155d5ab425467c7c04ff8b05c.jpg' alt='YoMerco-categoria-carnes' />
              <CategoryText>
              Carnes
              </CategoryText>
            </CategoryContainer>
            <CategoryContainer>
              <CategoryImage src='https://ctsecure.saveonfoods.com/legacy/productimagesroot/DJ/1/1306431.jpg' alt='YoMerco-categoria-variados' />
              <CategoryText>
              Variados
              </CategoryText>
            </CategoryContainer>
          </CategoryContent>
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
