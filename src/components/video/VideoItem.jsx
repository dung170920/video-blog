import {
  Avatar,
  Box,
  Center,
  Circle,
  Flex,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { getFirestore } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firebaseApp } from "../../firebase-config";
import { getUserByID } from "../../services/users.service";
import { defaultAvatar } from "../../assets/images";

const VideoItem = ({ video }) => {
  const bg = useColorModeValue("white", "var(--main-dark)");
  const bgTooltip = useColorModeValue("var(--main-dark)", "white");
  const border = useColorModeValue("#F0F3F6", "rgba(240, 243, 246, 0.1)");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (video.userID) {
      getUserByID(video.userID).then((response) => {
        setUser(response);
        // console.log(user);
      });
    }
  }, [video]);

  return (
    <Flex
      direction="column"
      h="auto"
      w="full"
      overflow="hidden"
      borderRadius="12px"
      shadow="lg"
      _hover={{ shadow: "xl" }}
      bg={bg}
    >
      <Link to={`/video-details/${video?.id}`}>
        <video
          style={{
            height: "250px",
            width: "100%",
            objectFit: "cover",
          }}
          src={video.videoUrl}
          muted
          onMouseOver={(e) => {
            var isPlaying =
              e.target.currentTime > 0 &&
              !e.target.paused &&
              !e.target.ended &&
              e.target.readyState > e.target.HAVE_CURRENT_DATA;
            if (!isPlaying) {
              e.target.play();
            }
          }}
          onMouseOut={(e) => e.target.pause()}
        />
      </Link>
      <Flex mt="auto" p="5" direction="column">
        <Box
          isTruncated
          as="h6"
          mb="3"
          fontSize="lg"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {video.title}
        </Box>
        <Link to={`/profile/${user?.uid}`}>
          <Flex alignItems="center">
            <Avatar
              src={user?.photoURL ? user?.photoURL : defaultAvatar}
              size="sm"
            />
            <Box ml="3">
              <Text fontWeight="bold">{user?.displayName}</Text>
              <Text fontSize="sm">
                {moment(new Date(parseInt(video.date)).toISOString()).fromNow()}
              </Text>
            </Box>
          </Flex>
        </Link>
      </Flex>
      <Flex
        p="5"
        alignItems="center"
        justifyContent="space-between"
        borderTop="1px"
        borderColor={border}
      >
        <Flex gap="8px">
          <Flex
            alignItems="center"
            bg="rgba(228, 228, 228, 0.25)"
            py={4}
            px={5}
            borderRadius="md"
            w="fit-content"
            fontSize="16px"
            gap="10px"
            fontWeight="bold"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ background: "#FF6A55", color: "#fff !important" }}
          >
            <FaHeart fontSize="24px" />
            Like
          </Flex>
          <Tooltip
            label="Add to playlist"
            bg={bgTooltip}
            shouldWrapChildren
            placement="top"
          >
            <Center
              borderRadius="md"
              py={4}
              px={4}
              bg="rgba(228, 228, 228, 0.25)"
              cursor="pointer"
            >
              <MdAdd fontSize="24px" />
            </Center>
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Circle size="8px" bg="#7FBA7A" mr="2"></Circle>0 watched
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VideoItem;
