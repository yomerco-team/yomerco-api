import React from 'react'
import { SearchContainer, SearchIcon } from './styles'

const Search = props => (
  <SearchContainer isActive={props.active}>
    <a onClick={props.toggle}>
      <SearchIcon />
    </a>
  </SearchContainer>
)

export default Search
