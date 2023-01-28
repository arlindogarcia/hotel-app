import React from "react";
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";

type CheckFieldProps = CheckboxProps & {
  name: string;
  label: string;
};

const CheckField: React.FC<CheckFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props.name);
  return (
    <FormControl isInvalid={!!error} mt="0.5em">
      <Checkbox {...field} {...props} id={field.name} isChecked={field.value}>
        {label}
      </Checkbox>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default CheckField;
