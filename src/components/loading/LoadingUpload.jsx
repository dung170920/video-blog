import { Flex, Progress, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";

const LoadingUpload = ({ msg, progress }) => {
  const bg = useColorModeValue("white", "var(--main-dark)");
  useEffect(() => {}, [progress]);

  return (
    <Flex direction="column" alignItems="center">
      <ThreeCircles
        color="#0078FF"
        height={110}
        width={110}
        ariaLabel="three-circles-rotating"
      />
      <Text color="#6F767E" textAlign="center" px="2" fontSize="20px" mt="3">
        {msg}
      </Text>
      {progress > 0 && (
        <Progress
          mt="50"
          size="sm"
          isAnimated
          value={Number.parseInt(progress)}
          rounded="sm"
          w="lg"
          colorScheme="messenger"
          bg={bg}
        />
      )}
    </Flex>
  );
};

export default LoadingUpload;
