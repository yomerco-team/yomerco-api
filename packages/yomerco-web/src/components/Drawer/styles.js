import styled from 'styled-components'
import Drawer from 'react-motion-drawer'
import Bars from 'react-icons/lib/fa/bars'

export const DrawerComp = styled(Drawer)`
background-color: white;
overflow-y: hidden;
`

export const DrawerIcon = styled(Bars)`
color: white;
font-size: 26px;
`

export const DrawerContainer = styled.div`
width: 14%;
height: 63px;
display: flex;
justify-content: center;
align-items: center;
border-right: 1px solid #6cad6c;
`

export const LinkContainer = styled.div`
padding: 16px 10px;
border-bottom: 1px solid #dadada;
`

export const DrawerLink = styled.a`
font-family: 'circular-black';
font-size: 18px;
color: #585858;
`
