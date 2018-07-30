import React from 'react'
import { CartContainer, CartIcon, ProductCount } from './styles'

const Cart = props => (
  <CartContainer>
    <a onClick={() => console.log('Carrito')}>
      <CartIcon />
      <ProductCount>13</ProductCount>
    </a>
  </CartContainer>
)
export default Cart
