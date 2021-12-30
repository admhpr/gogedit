import React from "react";
import { Formik, Form } from "formik";
import { Button } from "@chakra-ui/react";
import { Wrapper } from "src/components/Wrapper";
import { InputField } from "src/components/InputField";
import { useMutation } from "urql";

interface RegisterProps {}

const REGISTER_MUTATION = `
  mutation Register($username:String!, $password:String!) {
    register(options: {username: $username, password: $password}){
      user {
        id
        username
      },
      errors {
        field,
        message
      }
    }
}`;

const Register: React.FC<RegisterProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUTATION);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          return register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
            />
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
