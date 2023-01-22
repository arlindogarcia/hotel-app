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
  bgNone?: boolean;
  onChange?: () => void;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  disabled,
  mask,
  textarea,
  bgNone = false,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);

  if (mask && mask.length > 1) {
    return (
      <FormControl isInvalid={touched && error ? true : false}>
        {label && <FormLabel>{label}</FormLabel>}
        <Input
          bg={!bgNone ? 'white' : 'none'}
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
        {label && <FormLabel>{label}</FormLabel>}
        <Textarea
          bg={!bgNone ? 'white' : 'none'}
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
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        bg={!bgNone ? 'white' : 'none'}
        disabled={disabled}
        type={props.type}
        placeholder={props.placeholder}
        {...field}
        isInvalid={touched && error ? true : false}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
