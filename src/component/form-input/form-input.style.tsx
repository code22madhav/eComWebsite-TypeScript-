import styled, {css} from 'styled-components';
// $sub-color: grey;
// $main-color: black;    Since the file is changed to jsx file we need to convert it to js variables

const subColor='grey';
const mainColor='black';

// @mixin shrinkLabel {
//   top: -14px;
//   font-size: 12px;
//   color: $main-color;
// }   styled component comes with the {css} which helps us to create resuable css blocks

const shrinkLabel=css`
   top: -14px;
   font-size: 12px;
   color: ${mainColor};
`;

type FormInputLabelProps={
  shrink?: boolean,
}

export const FormInputLabel=styled.label<FormInputLabelProps>`
color: ${subColor};
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 300ms ease all;

    ${({shrink})=> shrink && shrinkLabel};
`
export const Input=styled.input`
    background: none;
    background-color: white;
    color: ${subColor};
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${subColor};
    margin: 25px 0;

    &:focus {
      outline: none;
    }

    &:focus ~ ${FormInputLabel} {
      ${shrinkLabel};
    } 
`;

export const Group=styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;