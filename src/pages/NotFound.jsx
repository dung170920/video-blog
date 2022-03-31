import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { notFound } from "../assets/svg";

const NotFound = () => {
  return (
    <Flex
      direction="column"
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Image src={notFound} w={600} />
      <Text fontSize={40} fontWeight="semibold">
        Not Found
      </Text>
    </Flex>
  );
};

export default NotFound;
