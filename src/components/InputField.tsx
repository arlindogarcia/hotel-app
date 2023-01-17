import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import ReactInputMask from "react-input-mask";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  mask?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  disabled,
  mask,
  textarea,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  if (mask && mask.length > 1) {
    return (
      <FormControl isInvalid={touched && error ? true : false}>
        <FormLabel>{label}</FormLabel>
        <Input
          as={ReactInputMask}
          mask={mask}
          disabled={disabled}
          type={props.type}
          {...field}
          isInvalid={touched && error ? true : false}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  }
  if (textarea) {
    return (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Textarea
          disabled={disabled}
          {...field}
          isInvalid={touched && error ? true : false}
        ></Textarea>
        {touched && error && <Text color="red">{error}</Text>}
      </FormControl>
    );
  }

  return (
    <FormControl isInvalid={touched && error ? true : false}>
      <FormLabel>{label}</FormLabel>
      <Input
        disabled={disabled}
        type={props.type}
        {...field}
        isInvalid={touched && error ? true : false}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
