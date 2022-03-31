import { Badge } from "@chakra-ui/react";
import React from "react";

const CategoryTag = ({ category }) => {
  return (
    <Badge
      px="12px"
      py="4px"
      w="fit-content"
      mr="1"
      colorScheme={category?.color}
      borderRadius="8px"
    >
      {category?.name}
    </Badge>
  );
};

export default CategoryTag;
