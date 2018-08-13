import React, { Component } from 'react'
import Header from '../../components/Header'
import CategorySection from '../../components/CategorySection'
import logoAlt from '../../assets/logo-alt.svg'
import {
  Container,
  Content,
  FooterContent,
  FooterImage,
  FooterDescription,
  Copyright
} from './styles'

class Error extends Component {
  render () {
    return (
      <Content>
        <Header />
        <Container>
          <FooterContent>
            <FooterImage src={logoAlt} alt='alternative-logo-yomerco' />
            <FooterDescription>
            Oops! Hubo un error.
            </FooterDescription>
            <FooterDescription>
            Te recomendamos volver a la página principal.
            </FooterDescription>
          </FooterContent>
          <CategorySection drawer />
          <Copyright>
            <b>yomerco.co</b> es una marca registrada - 2018.
          </Copyright>
        </Container>
      </Content>
    )
  }
}

export default Error
