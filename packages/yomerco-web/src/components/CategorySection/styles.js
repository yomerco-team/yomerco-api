import styled from 'styled-components'

export const CategoryView = styled.div`
width: 100%;
`

export const SectionTitle = styled.p`
font-family: 'circular-black';
font-size: ${props => props.drawer ? '18px' : '22px'};
color: #585858;
padding: 12px 10px;
border-bottom: 4px solid #d5d5d5;
`

export const CategoryContent = styled.div`
display: flex;
flex-wrap: wrap;
padding: 12px 18px 24px 18px;
border-bottom: 1px solid #d5d5d5;
justify-content: space-between;
`

export const CategoryContainer = styled.a`
margin: 16px 10px 10px 10px;
display: flex;
flex-direction: column;
`

export const CategoryText = styled.p`
font-family: 'circular-medium';
font-size: 18px;
margin-top: 12px;
color: #585858;
text-align: center;
`

export const CategoryImage = styled.img`
height: 84px;
width: 84px;
`
