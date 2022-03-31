import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import {
  Avatar,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiChevronDown, BiChevronUp, BiUser } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";
import {
  RiSunFill,
  RiLogoutCircleLine,
  RiSettings4Line,
  RiSearchLine,
} from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "var(--main-dark)");
  const { colorMode, toggleColorMode } = useColorMode();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("login");
  };

  return (
    <Flex
      color="#6F767E"
      bg={bg}
      px="14"
      py="7"
      shadow="sm"
      alignItems="center"
      justifyContent="space-between"
    >
      <InputGroup w="400px">
        <InputLeftElement
          pointerEvents="none"
          children={<RiSearchLine color="gray.300" />}
        />
        <Input placeholder="Search..." />
      </InputGroup>
      <Flex alignItems="center" gap="20px">
        <Flex
          alignItems="center"
          justifyContent="center"
          onClick={toggleColorMode}
          w="48px"
          h="48px"
          cursor="pointer"
          borderRadius="5px"
        >
          {colorMode === "light" ? (
            <FaMoon fontSize="20px" />
          ) : (
            <RiSunFill fontSize="20px" />
          )}
        </Flex>
        <Link to="create">
          <Flex
            alignItems="center"
            px="5"
            h="48px"
            fontWeight="bold"
            bg="messenger.500"
            color="white"
            borderRadius="12px"
            _hover={{ bg: "messenger.600" }}
            transition="all .3s"
          >
            <MdAdd fontSize="24px" color="white" />
            Create
          </Flex>
        </Link>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton>
                <Flex alignItems="center">
                  <Avatar
                    name={userInfo?.displayName}
                    src={userInfo?.photoURL}
                    size="sm"
                    mr="2"
                  />
                  <Text fontWeight="medium" mr="2" fontSize="sm">
                    {userInfo?.displayName}
                  </Text>
                  {!isOpen ? (
                    <BiChevronDown fontSize="20px" />
                  ) : (
                    <BiChevronUp fontSize="20px" />
                  )}
                </Flex>
              </MenuButton>
              <MenuList shadow="lg">
                <Link to={`profile/${userInfo?.uid}`}>
                  <MenuItem alignItems="center" gap="4">
                    <BiUser fontSize="20px" />
                    My profile
                  </MenuItem>
                </Link>
                <Link to="settings">
                  <MenuItem alignItems="center" gap="4">
                    <RiSettings4Line fontSize="20px" />
                    Settings
                  </MenuItem>
                </Link>
                <MenuItem alignItems="center" gap="4" onClick={logout}>
                  <RiLogoutCircleLine fontSize="20px" />
                  Log out
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
