import { FC, ButtonHTMLAttributes } from 'react';
import {BaseButton, GoogleSignIn, Inverted, LoadingSpinner} from './button.styles';

export enum BUTTON_TYPE_CLASSES { 
  base= 'base',                      
  google= 'google-sign-in',
  inverted= 'inverted',
};
//just to increase readibility of props we are using BUTTON_TYPE_CLASSES we can directly do this by: 
// const getButton = (buttonType = 'base') =>
//   ({
//     ["base"]: "BaseButton",
//     ["google"]: "GoogleSignIn",
//     ["inverted"]: "Inverted",
//   }[buttonType]);

// console.log(getButton('base'));



// const getButton=(buttonType = BUTTON_TYPE_CLASSES.base)=>{
//   const btnType={
//     [BUTTON_TYPE_CLASSES.base]: "BaseButton",
//     [BUTTON_TYPE_CLASSES.google]: "GoogleSignInButton",
//     [BUTTON_TYPE_CLASSES.inverted]: "InvertedButton",
//   }
//   return btnType[buttonType];
// }
// If below function is not clear take reference from above one
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignIn,
    [BUTTON_TYPE_CLASSES.inverted]: Inverted,
  }[buttonType]);

//console.log(getButton('base')); //defining a fuction is good it prevents cases where user miss spells buttontype
                                  //and the BUTTON_TYPE_CLASSES will through undefined. therefore function has a fall
                                  // back mechanism even if nothing matches base class will work.
export type Buttonprops={
  buttonType?: BUTTON_TYPE_CLASSES,
  isLoading?: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>
//this ButtonHTMLAttributs provides the specific attribute bindings by react, this helps to get type of those inbuilt attributes of button like: type, disabled etc if you don't provide this otherprops will go like a empty a object

//this FC is added to provide type to the children because we don't want to type it manually this way 
const Button:FC<Buttonprops> = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton=getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>{isLoading ? <LoadingSpinner /> : children}</CustomButton>
  );                                        
};

export default Button;