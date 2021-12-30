import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Box,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  let InputOrTextarea;
  if (textarea) {
    InputOrTextarea = Textarea;
  } else {
    InputOrTextarea = Input;
  }
  const hasError = Boolean(error);
  return (
    <Box mt={4}>
      <FormControl isInvalid={hasError}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <InputOrTextarea {...field} {...props} id={field.name} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </Box>
  );
};
