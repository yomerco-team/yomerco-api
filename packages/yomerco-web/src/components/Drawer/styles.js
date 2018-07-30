import styled from 'styled-components'
import Drawer from 'react-motion-drawer'
import Bars from 'react-icons/lib/fa/bars'

export const DrawerComp = styled(Drawer)`
background-color: white;
padding: 18px 16px;
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
