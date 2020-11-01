import styled from 'styled-components'

export const HeaderContainer = styled.div`
background-color: #409640;
height: 63px;
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
`

export const HeaderContent = styled.div`
background-color: rgba(0,0,0,0.5);
height: auto;
width: 100%;
display: flex;
position: fixed;
flex-direction: column;
`

export const Logo = styled.img`
height: auto;
width: 160px;
`

export const LogoContainer = styled.div`
width: 52%;
height: 63px;
display: flex;
justify-content: center;
align-items: center;
border-right: 1px solid #6cad6c;
`

export const Shadow = styled.a`
display: ${props => props.active ? 'flex' : 'none'};
height: 100vh;
`
