import { Center } from "@chakra-ui/react";
import React from "react";

const FilterTag = (props) => {
  const { children, active } = props;
  const styles = [
    {
      active: true,
      style: {
        bg: "messenger.500",
        color: "white",
      },
    },
    {
      active: false,
      style: {
        bg: "messenger.50",
        color: "messenger.500",
      },
    },
  ];

  return (
    <Center
      px="4"
      py="2"
      fontSize="xs"
      fontWeight="bold"
      rounded="2xl"
      {...styles.find((item) => item.active === active).style}
    >
      {children}
    </Center>
  );
};

export default FilterTag;
