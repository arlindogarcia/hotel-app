import { RadioGroup, RadioGroupProps } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type RadioFieldProps = RadioGroupProps & {
  name: string;
};

const RadioField: React.FC<RadioFieldProps> = ({
  size: _,
  children,
  ...props
}) => {
  const [field, , { setValue }] = useField(props.name);
  return (
    <RadioGroup
      {...field}
      {...props}
      onChange={(val) => {
        setValue(parseInt(val));
      }}
      id={field.name}
    >
      {children}
    </RadioGroup>
  );
};

export default RadioField;
