import styled from 'styled-components'
import Search from 'react-icons/lib/fa/search'

export const SearchIcon = styled(Search)`
color: white;
font-size: 26px;
`

export const SearchContainer = styled.div`
width: 14%;
height: 63px;
display: flex;
justify-content: center;
align-items: center;
border-right: 1px solid #6cad6c;
background-color: ${props => props.isActive ? '#6cad6c' : '#409640'};
`

export const SearchBoxContainer = styled.div`
box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
background-color: #d8d8d8;
width: 100%;
text-align: center;
`

export const SearchInput = styled.input`
display: ${props => props.isActive ? 'initial' : 'none'};
font-size: 16px;
margin: 0 auto;
height: 50px;
width: 90%;
font-family: 'circular-book';
outline: none;
border-radius: 4px;
border-style: none;
margin: 15px auto;
padding: 11px 15px;
`
