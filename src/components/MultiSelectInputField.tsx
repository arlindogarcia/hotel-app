import {
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import MultiSelectInput from "./MultiSelectInput";

interface Item {
  label: string;
  value: string;
}

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  items: Item[];
};

export const MultiSelectInputField: React.FC<InputFieldProps> = ({
  label,
  disabled,
  items,
  ...props
}) => {
  const [field, { error, touched }, { setValue }] = useField(props);

  return (
    <FormControl isInvalid={touched && error ? true : false}>
      <MultiSelectInput {...field} onChange={(val) => setValue(val, false)} label={label} options={items} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
