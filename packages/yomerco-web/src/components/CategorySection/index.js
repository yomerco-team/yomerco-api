import React, { Component } from 'react'
import {
  CategoryView,
  SectionTitle,
  CategoryContainer,
  CategoryContent,
  CategoryText,
  CategoryImage
} from './styles'

class CategorySection extends Component {
  render () {
    return (
      <CategoryView>
        <SectionTitle drawer={this.props.drawer}>
            Compra por categorías
        </SectionTitle>
        <CategoryContent>
          <CategoryContainer>
            <CategoryImage src='https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201706/15/00202002800106____1__600x600.jpg' alt='YoMerco-categoria-verduras' />
            <CategoryText>
              Verduras
            </CategoryText>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryImage src='https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201703/15/00118104500022____2__600x600.jpg' alt='YoMerco-categoria-frutas' />
            <CategoryText>
              Frutas
            </CategoryText>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryImage src='https://s3-us-west-2.amazonaws.com/mercadoni/live/e6a6f9c379333b3155d5ab425467c7c04ff8b05c/medium_e6a6f9c379333b3155d5ab425467c7c04ff8b05c.jpg' alt='YoMerco-categoria-carnes' />
            <CategoryText>
              Carnes
            </CategoryText>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryImage src='https://ctsecure.saveonfoods.com/legacy/productimagesroot/DJ/1/1306431.jpg' alt='YoMerco-categoria-variados' />
            <CategoryText>
              Variados
            </CategoryText>
          </CategoryContainer>
        </CategoryContent>
      </CategoryView>
    )
  };
}

export default CategorySection
