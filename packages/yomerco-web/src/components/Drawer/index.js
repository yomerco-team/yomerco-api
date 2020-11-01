import React, { Component } from 'react'
import CategorySection from '../CategorySection'
import { DrawerContainer, DrawerComp, DrawerIcon, DrawerLink, LinkContainer } from './styles'

class Drawer extends Component {
     state = {
       openLeft: false,
       openRight: false,
       width: '84%'
     };

     render () {
       return (
         <DrawerContainer>
           <DrawerComp open={this.state.openLeft}
             fadeOut
             width={this.state.width}
             onChange={open => this.setState({ openLeft: open })}
             noTouchOpen>
             <LinkContainer>
             <DrawerLink>Iniciar sesión o registrarse</DrawerLink>
             </LinkContainer>
             <CategorySection drawer />
             <LinkContainer>
             <DrawerLink>Contáctanos</DrawerLink>
             </LinkContainer>
             <LinkContainer>
             <DrawerLink>FAQs</DrawerLink>
             </LinkContainer>
             </DrawerComp>
           <a onClick={() => this.setState({ openLeft: !this.state.openLeft, openRight: false })}>
             <DrawerIcon />
           </a>
         </DrawerContainer>
       )
     }
}

export default Drawer
