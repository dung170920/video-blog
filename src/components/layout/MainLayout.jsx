import React from "react";
import { Outlet } from "react-router-dom";
import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
import NavBar from "./nav-bar/NavBar";
import SideBar from "./side-bar/SideBar";

const MainLayout = () => {
  const bg = useColorModeValue(
    "var(--background-light)",
    "var(--background-dark)"
  );
  return (
    <Flex h="full">
      <SideBar />
      <Box w="full" pl="250px">
        <NavBar />
        <Box bg={bg} p="10" minH="86vh">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default MainLayout;
