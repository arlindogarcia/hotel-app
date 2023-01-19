
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import './InputEditor.css';

type InputEditorProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  height?: number;
};

export const InputEditor: React.FC<InputEditorProps> = ({
  label,
  disabled,
  ...props
}) => {
  const [, { error, touched, value }, { setValue }] = useField(props);

  return (
    <FormControl height={props.height} isInvalid={touched && error ? true : false}>
      <FormLabel>{label}</FormLabel>
      <ReactQuill className={error ? 'ql-error ql-white' : 'ql-white'} value={value} theme="snow" onChange={(e) => setValue(e)} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
