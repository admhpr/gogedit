import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <Box>{children}</Box>;
};
