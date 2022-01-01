import React from "react";
import { Formik, Form } from "formik";
import { Button } from "@chakra-ui/react";
import { Wrapper } from "src/components/Wrapper";
import { InputField } from "src/components/InputField";
import { useRegisterMutation } from "src/generated/graphql";
import { toErrorMap } from "src/utils/toErrorMap";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const result = await register(values);
          if (result.data?.register.errors) {
            const {
              data: { register },
            } = result;
            setErrors(toErrorMap(register.errors!));
          }
          return result;
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
