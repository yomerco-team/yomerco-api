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
import { Link } from 'react-router-dom'

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

    const { name, url, image, price, unit } = this.props;

    return (
      <CardContainer>
          <Link to={'/producto/'+url}>
        <ProductImage src={image} />
        </Link>
        <InfoProductContainer>
          <PriceContainer>
            <PriceText>{price}</PriceText>
            <MeasurementText>{unit}</MeasurementText>
          </PriceContainer>
          <ProductName>
              {name}
          </ProductName>
            {this.state.added ? this.renderQuantifier() : this.renderButtonCart()}
        </InfoProductContainer>
      </CardContainer>
    )
  }
}

export default ProductCard
