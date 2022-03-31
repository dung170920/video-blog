import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const LoadingPage = ({ msg }) => {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      <ThreeCircles
        color="#0078FF"
        height={110}
        width={110}
        ariaLabel="three-circles-rotating"
      />
      <Text color="#6F767E" textAlign="center" px="2" fontSize="20px" mt="3">
        {msg}
      </Text>
    </Flex>
  );
};

export default LoadingPage;
