import React, { Component } from 'react'
import { SearchBoxContainer, SearchInput } from './styles'

class SearchBox extends Component {
  render () {
    return (
      <SearchBoxContainer>
        <SearchInput isActive={this.props.active} type='search' placeholder='Busca los productos que necesites…' autoFocus={this.props.active} />
      </SearchBoxContainer>
    )
  }
}

export default SearchBox
