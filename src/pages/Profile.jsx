import {
  Box,
  Image,
  Flex,
  Text,
  Center,
  useColorModeValue,
  Avatar,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserByID } from "../services/users.service";
import { Link, Outlet, useParams } from "react-router-dom";
import { defaultAvatar } from "../assets/images";
import { useAuth } from "../hooks/useAuth";
import { LoadingPage } from "../components";
const Profile = () => {
  const { id } = useParams("id");
  const { userInfo } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const border = useColorModeValue("#F0F3F6", "rgba(240, 243, 246, 0.1)");
  const tabColor = useColorModeValue("#1A1D1F", "#FCFCFC");
  const tabBg = useColorModeValue("#EFEFEF", "#272B30");
  const bg = useColorModeValue("white", "var(--main-dark)");

  useEffect(() => {
    setLoading(true);
    getUserByID(id)
      .then((response) => {
        setUser(response);
        setLoading(false);
        // console.log(user);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingPage msg="Please wait to loading page" />;

  return (
    <>
      <Box>
        <Box h="400px" m="-40px -40px 0">
          <Image
            src="https://ui8-core.herokuapp.com/img/content/bg-shop.jpg"
            h="full"
            w="full"
            objectFit="cover"
          />
        </Box>
        <Flex
          position="relative"
          bg={bg}
          p="12"
          borderRadius="24px"
          m="-64px auto 0"
          gap="7"
          w="full"
          pb="10"
          direction="column"
        >
          <Flex justifyContent="space-between" w="full">
            <Flex>
              <Avatar
                mr="8"
                pos="relative"
                p="8px"
                border="2px solid #0078FF"
                bg="transparent"
                w="88px"
                h="88px"
                src={user?.photoURL ? user?.photoURL : defaultAvatar}
              >
                <Box
                  pos="absolute"
                  bg="green"
                  w="12px"
                  h="12px"
                  top="0"
                  right="0"
                  border="2px solid #fff"
                  borderRadius="50%"
                />
              </Avatar>
              <Flex direction="column" gap="18px">
                <Link to={`/profile/${user?.uid}`}>
                  <Flex alignItems="center">
                    <Box as="h3" fontSize="36px" fontWeight="semibold" mr="2">
                      {user?.displayName}
                    </Box>
                    {/* <FcOk fontSize="32px" /> */}
                  </Flex>
                </Link>

                <Flex
                  alignItems="center"
                  gap="6"
                  fontWeight="medium"
                  fontSize="18"
                >
                  <Text>0 followers</Text>
                  <Text>0 videos</Text>
                </Flex>
                <Text color="#808191">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Asperiores, maiores ipsam beatae natus quo officiis architecto
                  saepe, perferendis molestias fuga atque, voluptates sunt
                  molestiae modi dolorem suscipit distinctio magnam commodi?
                </Text>
              </Flex>
            </Flex>
            <Flex
              alignItems="center"
              px="42px"
              h="56px"
              borderRadius="16px"
              cursor="pointer"
              fontWeight="bold"
              bg="messenger.500"
              color="white"
              _hover={{ bg: "messenger.600" }}
              transition="all .3s"
            >
              Follow
            </Flex>
          </Flex>
          <Tabs variant="unstyled" borderTop="1px" borderColor={border}>
            <TabList my="8">
              <Link to="">
                <Tab
                  borderRadius="8px"
                  fontWeight="semibold"
                  color="#6F767E"
                  transition="all .2s"
                  py="2"
                  px="4"
                  mr="2"
                  _selected={{ color: tabColor, bg: tabBg }}
                  _focus={{ boxShadow: "0" }}
                >
                  Videos
                </Tab>
              </Link>
              {user?.uid === userInfo?.uid && (
                <>
                  <Link to="followers">
                    <Tab
                      borderRadius="8px"
                      fontWeight="semibold"
                      color="#6F767E"
                      transition="all .2s"
                      py="2"
                      px="4"
                      mr="2"
                      _selected={{ color: tabColor, bg: tabBg }}
                      _focus={{ boxShadow: "0" }}
                    >
                      Followers
                    </Tab>
                  </Link>
                  <Link to="following">
                    <Tab
                      borderRadius="8px"
                      fontWeight="semibold"
                      color="#6F767E"
                      transition="all .2s"
                      py="2"
                      px="4"
                      mr="2"
                      _selected={{ color: tabColor, bg: tabBg }}
                      _focus={{ boxShadow: "0" }}
                    >
                      Following
                    </Tab>
                  </Link>
                </>
              )}
            </TabList>
            <Outlet />
          </Tabs>
        </Flex>
      </Box>
    </>
  );
};

export default Profile;
