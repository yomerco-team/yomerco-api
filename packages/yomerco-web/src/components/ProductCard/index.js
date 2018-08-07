import React, { Component } from 'react'
import {
  CardContainer,
  ProductImage,
  PriceText,
  MeasurementText,
  InfoProductContainer,
  PriceContainer,
  ProductName,
  AddToCart,
  QuantifierContainer,
  EditQuantity,
  Quantity,
  DeleteIcon
} from './styles'

class ProductCard extends Component {

    state = {
        added: false,
        quantity: 1,
        delete: true
    } 

    renderButtonCart = () => {
        return (
            <AddToCart onClick={() => this.setState({ added: !this.state.added})}>
                Agregar al carrito
            </AddToCart>
            )
    }

    removeItem = () => {
        if(this.state.quantity < 3){
            this.setState({delete: true})    
        }
        if(this.state.quantity > 1){
        this.setState({quantity: this.state.quantity-1})
        } else {
            this.setState({added: !this.state.added})
        }
    }
    

    renderQuantifier = () => {
        return (
            <QuantifierContainer>
            <EditQuantity delete={this.state.delete} onClick={() => this.removeItem()}>
                {this.state.quantity > 1 ? '-' : <DeleteIcon />}
            </EditQuantity>
            <Quantity>
                {this.state.quantity}
            </Quantity>
            <EditQuantity onClick={() => this.setState({ quantity: 1+this.state.quantity,  delete: false })}>
                +
            </EditQuantity>
            </QuantifierContainer>
            )
    }

  render () {
    return (
      <CardContainer>
        <ProductImage src='https://jumbocolombiafood.vteximg.com.br/arquivos/ids/3323095-750-750/20386511-1.jpg' />
        <InfoProductContainer>
          <PriceContainer>
            <PriceText>$500 COP</PriceText>
            <MeasurementText>1000 gramos</MeasurementText>
          </PriceContainer>
          <ProductName>
              Papa capira lavada
          </ProductName>
            {this.state.added ? this.renderQuantifier() : this.renderButtonCart()}
        </InfoProductContainer>
      </CardContainer>
    )
  }
}

export default ProductCard
