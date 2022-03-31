import {
  Avatar,
  Box,
  Circle,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { defaultAvatar } from "../../assets/images";
import { MdMoreHoriz } from "react-icons/md";

const CommentItem = ({ user }) => {
  const border = useColorModeValue("#F0F3F6", "rgba(240, 243, 246, 0.1)");
  const hover = useColorModeValue(
    "rgba(228, 228, 228, 0.5)",
    "rgba(228, 228, 228, 0.1)"
  );

  return (
    <Flex p="7" _hover={{ background: hover }} borderRadius="12">
      <Avatar src={user?.photoURL ? user?.photoURL : defaultAvatar} mr="6" />
      <Box>
        <Flex mb="4">
          <Text mr="3" color="messenger.500" fontWeight="medium">
            Dung Nguyen
          </Text>
          <Text>12h</Text>
        </Flex>
        <Text mb="4">
          Can anyone tell me the settings for character voice lines cause its so
          boring to play without no characters lines....
        </Text>
        <Circle w="8" h="8" border="1px" cursor="pointer" borderColor={border}>
          <MdMoreHoriz fontSize="md" />
        </Circle>
      </Box>
    </Flex>
  );
};

export default CommentItem;
