import React, { Component } from 'react'
import logo from '../../assets/logo.svg'
import { Header, Container } from './styles'

class Home extends Component {
  render () {
    return (
      <Container>
        <Header>
          <img src={logo} alt='YoMerco-logo-mercado-online' />
        </Header>
      </Container>
    )
  }
}

export default Home
