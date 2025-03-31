import styled from "styled-components";
import { BaseButton, GoogleSignIn, Inverted } from "../button/button.styles";

export const CartDropDownContainer=styled.div`
    position: absolute;
    width: 240px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;
    ${BaseButton},${GoogleSignIn}, ${Inverted}{
    margin-top: auto
    }
`;
/* Above is an example of nesting in styled component now here it means any styled component like BaseButton 
if it lies inside CartDropDownContainer then apply the stle otherwise leave it*/

export const CartItemContainer=styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;