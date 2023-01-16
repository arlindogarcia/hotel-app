import React from "react";
import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import { formatNumber } from "../utils/formatNumber";

type InputNumberProps = InputHTMLAttributes<HTMLInputElement> &
  ChakraProps & {
    name: string;
    label?: string;
    decimalPlaces?: number;
  };

const InputNumber: React.FC<InputNumberProps> = ({
  label,
  decimalPlaces,
  size: _,
  ...props
}) => {
  const [field, { error }, { setValue }] = useField(props);

  const decPlaces = typeof decimalPlaces === "number" ? decimalPlaces : 2;
  const handleNumberChange = (e: any) => {
    const value =
      "0".repeat(decPlaces + 1) + e.target.value.replace(/[^0-9]/g, "");
    const val =
      value.substring(0, value.length - decPlaces) +
      "." +
      value.substring(value.length - decPlaces);
    setValue(parseFloat(val), false);
  };

  return (
    <FormControl isInvalid={!!error} mt="0.5em">
      {!!label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <Input
        value={formatNumber(field.value, decPlaces)}
        onBlur={field.onBlur}
        onChange={handleNumberChange}
        id={field.name}
        {...props}
        placeholder={props.placeholder}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputNumber;
