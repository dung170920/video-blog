import {
  Avatar,
  Box,
  Circle,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserByID } from "../../services/users.service";
import { defaultAvatar } from "../../assets/images";
import moment from "moment";
import { Link } from "react-router-dom";

const RecommendedVideos = ({ video }) => {
  const [user, setUser] = useState(null);

  const bg = useColorModeValue("white", "var(--main-dark)");

  useEffect(() => {
    getUserByID(video?.userID).then((response) => {
      setUser(response);
    });
  }, []);

  return (
    <Link to={`/video-details/${video?.id}`}>
      <Flex
        gap="4"
        borderRadius="24"
        bg={bg}
        p="2"
        maxH="143px"
        h="143px"
        alignItems="center"
      >
        <Box overflow="hidden" h="full" w="170px" borderRadius="24">
          <video
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            src={video?.videoUrl}
          ></video>
        </Box>
        <Flex flex="1" direction="column" gap="2">
          <Text
            style={{
              "-webkit-line-clamp": "3",
              "-webkit-box-orient": "vertical",
              overflow: "hidden",
              display: "-webkit-box",
            }}
            textTransform="capitalize"
            lineHeight="19px"
            fontSize="16px"
            fontWeight="semibold"
          >
            {video?.title}
          </Text>
          <Box mt="auto">
            <Flex alignItems="center" mb="2">
              <Circle w="1" h="1" bg="#7FBA7A" mr="2" />
              <Text color="#808191" fontSize="12px" fontWeight="medium">
                {moment(
                  new Date(parseInt(video?.date)).toUTCString()
                ).fromNow()}
              </Text>
            </Flex>
            <Flex alignItems="center" mb="1">
              <Avatar
                w="6"
                h="6"
                mr="2"
                src={user?.photoURL ? user?.photoURL : defaultAvatar}
              />
              <Text whiteSpace="nowrap" fontSize="13px" fontWeight="blod">
                Dung Nguyen
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Link>
  );
};

export default RecommendedVideos;
