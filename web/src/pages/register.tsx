import React from "react";
import { Formik, Form } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <FormControl isRequired>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              value={values.username}
              onChange={handleChange}
              id="username"
              placeholder="Username"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="first-name"></FormLabel>
            <Input id="first-name" placeholder="First name" />
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
