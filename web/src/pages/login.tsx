import React from "react";
import { Formik, Form } from "formik";
import { Button } from "@chakra-ui/react";
import { Wrapper } from "src/components/Wrapper";
import { InputField } from "src/components/InputField";
import { useLoginMutation } from "src/generated/graphql";
import { toErrorMap } from "src/utils/toErrorMap";
import { useRouter } from "next/router";

interface RegisterProps {}

const Login: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await login({ options: values });
          if (data?.login.errors) {
            const { login } = data;
            setErrors(toErrorMap(login.errors!));
          } else if (data?.login.user) {
            router.push("/");
          }
          return data;
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

export default Login;
