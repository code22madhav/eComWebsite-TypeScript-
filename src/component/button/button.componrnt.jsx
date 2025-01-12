import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {       //just to increase readibility of props
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>{children}</button>
  );                                        //this synxtax inside ${} is for object property access  bracket notation used to dynamically access a property of the object.
};

export default Button;