import styled from 'styled-components'
import Delete from 'react-icons/lib/md/delete'

export const CardContainer = styled.div`
background-color: #fff;
border-bottom: 1px solid #d5d5d5;
height: auto;
display: flex;
padding: 16px 10px;
flex-direction: row;
justify-content: flex-start;
`
export const ProductImage = styled.img`
width: 100px;
height: 100px;
`

export const InfoProductContainer = styled.div`
display: flex;
flex-direction: column;
padding-left: 10px;
width: 100%;
align-items: flex-start;
`

export const PriceContainer = styled.div`
display: flex;
flex-direction: row;
align-content: flex-start;
`

export const PriceText = styled.p`
font-size: 20px;
color: #409640;
font-family: 'circular-medium';
`

export const MeasurementText = styled.p`
font-size: 16px;
margin-left: 6px;
padding-top: 4px;
color: #747474;
font-family: 'circular-book';
`

export const ProductName = styled.p`
color: #585858;
margin-top: 6px;
font-size: 18px;
font-family: 'circular-medium';
`
export const AddToCart = styled.button`
border-radius: 4px;
font-family: 'circular-book';
border-style: none;
font-size: 16px;
margin-top: 10px;
padding: 12px 0;
width: 100%;
background-color: #0074B8;
color: white;
`

export const QuantifierContainer = styled.div`
margin-top: 10px;
width: 100%;
display: flex;
justify-content: space-between;
`

export const EditQuantity = styled.button`
border-radius: 4px;
font-family: 'circular-book';
border-style: none;
font-size: 16px;
padding: 12px 0;
width: 30%;
background-color:${props => props.delete ? '#bf2424' : '#0074b8'};
color: white;
`

export const Quantity = styled.p`
font-family: 'circular-black';
font-size: 18px;
margin-top: 7px;
color: #585858;
`

export const DeleteIcon = styled(Delete)`
color: white;
font-size: 16px;
`
