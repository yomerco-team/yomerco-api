import React, { Component } from 'react'
import logo from '../../assets/logo.svg'
import Drawer from '../Drawer'
import Search from '../Search'
import Cart from '../Cart'
import SearchBox from '../Search/searchBox'
import { HeaderContainer, Logo, LogoContainer, HeaderContent } from './styles'

class Header extends Component {
  state = { // eslint-disable-line
    searchPressed: false
  }

  toggleSearch = () => {
    this.setState({ searchPressed: !this.state.searchPressed })
  }

  render () {
    return (
      <HeaderContent>
        <HeaderContainer>
          <Drawer />
          <LogoContainer>
            <Logo src={logo} alt='YoMerco-logo-mercado-online' />
          </LogoContainer>
          <Search toggle={() => this.toggleSearch()} active={this.state.searchPressed} />
          <Cart />
        </HeaderContainer>
        <SearchBox active={this.state.searchPressed} />
      </HeaderContent>
    )
  }
}

export default Header
