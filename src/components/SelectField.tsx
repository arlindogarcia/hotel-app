import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

export type SelectFieldProps = InputHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  onChange,
  size: _,
  ...props
}) => {
  const [field, { error }, { setValue }] = useField(props);
  return (
    <FormControl isInvalid={!!error} mt="0.5em">
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <Select
        bg="white"
        onChange={(e) => { setValue(e.target.value, false); typeof onChange === 'function' && onChange(e) }}
        value={field.value}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      >
        {props.children}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default SelectField;
