import React, { Component } from 'react'
import { DrawerContainer, DrawerComp, DrawerIcon } from './styles'

class Drawer extends Component {
     state = {
       openLeft: false,
       openRight: false,
       width: '70%'
     };

     render () {
       return (
         <DrawerContainer>
           <DrawerComp open={this.state.openLeft}
             fadeOut
             width={this.state.width}
             onChange={open => this.setState({ openLeft: open })}
             noTouchOpen
             noTouchClose />
           <a onClick={() => this.setState({ openLeft: !this.state.openLeft, openRight: false })}>
             <DrawerIcon />
           </a>
         </DrawerContainer>
       )
     }
}

export default Drawer
