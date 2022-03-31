import React from "react";
import { Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { IoGameController, IoMusicalNote } from "react-icons/io5";
import { FaSmileWink, FaFilm, FaQq } from "react-icons/fa";
import { GiAngelOutfit } from "react-icons/gi";
import { MdEmojiNature, MdDashboard } from "react-icons/md";
import { logo } from "../../../assets/images";
import { Link } from "react-router-dom";

const SideBar = () => {
  const bg = useColorModeValue("white", "var(--main-dark)");
  const links = [
    {
      id: 1,
      to: "/",
      icon: <MdDashboard fontSize="25" />,
      text: "Dashboard",
    },
    {
      id: 2,
      to: "/browse",
      icon: <MdDashboard fontSize="25" />,
      text: "Browse",
    },
    {
      id: 3,
      to: "/my-videos",
      icon: <MdDashboard fontSize="25" />,
      text: "My Videos",
    },
    {
      id: 4,
      to: "/following",
      icon: <MdDashboard fontSize="25" />,
      text: "Following",
    },
  ];

  return (
    <Flex
      bg={bg}
      direction={"column"}
      p={5}
      h="100%"
      w="250px"
      shadow="md"
      color="#6F767E"
      pos="fixed"
    >
      <Link to="/">
        <Flex alignItems={"center"} mb="36px" px="4">
          <Image src={logo} boxSize="32px" objectFit="cover" mr={2} />
          <Text fontWeight={"bold"}>Video.</Text>
        </Flex>
      </Link>
      {links.map((link) => (
        <Link to={link.to} key={link.id}>
          <Flex alignItems="center" gap="2" p="4" cursor="pointer">
            {link.icon}
            {link.text}
          </Flex>
        </Link>
      ))}
    </Flex>
  );
};

export default SideBar;
