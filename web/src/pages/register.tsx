import React from "react";
import { Formik, Form } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Wrapper } from "src/components/Wrapper";
interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  return (
    <Wrapper variant="small">
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                value={values.password}
                onChange={handleChange}
                id="password"
                placeholder="Password"
              />
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
