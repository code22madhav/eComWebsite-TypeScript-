import {Group, Input, FormInputLabel} from './form-input.style';
import { FC, InputHTMLAttributes } from 'react';

export type FormInputProps={
  label: string,
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value=== 'string' && otherProps.value.length)}>{label}</FormInputLabel>
      )}
    </Group>
  );
};
//why this much long boolean check because shrink{otherProps.value.length} typescipt is thinking it might be no otherprops is passed 
export default FormInput;