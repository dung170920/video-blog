import React from "react";
import {
  Flex,
  Image,
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { loginBg } from "../assets/images";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "../firebase-config";

const Login = () => {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();

  const bg = useColorModeValue("white", "var(--main-dark)");

  const login = async () => {
    const { user } = await signInWithPopup(auth, provider);
    const { providerData, refreshToken } = user;

    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refreshToken));

    await setDoc(doc(db, "users", providerData[0].uid), providerData[0]);

    navigate("/");
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      position="relative"
    >
      <Image src={loginBg} objectFit="cover" width="full" height="full" />
      <Flex
        position="absolute"
        width="100vw"
        height="100vh"
        inset="full"
        bg="blackAlpha.600"
        alignItems="center"
        justifyContent={"center"}
      >
        <Box p={12} bg={bg} borderRadius="20px" w={464}>
          <Box as="h2" fontWeight={"bold"} fontSize={40} mb={5}>
            Sign In
          </Box>
          <FormControl mb={6}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              size={"sm"}
              p={6}
              variant="filled"
              placeholder="Enter your email"
              focusBorderColor="messenger.500"
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              size={"sm"}
              p={6}
              variant="filled"
              placeholder="Enter your password"
              focusBorderColor="messenger.500"
            />
          </FormControl>
          <Button
            colorScheme="messenger"
            type="submit"
            w="full"
            py={6}
            size="sm"
            mb={6}
          >
            Submit
          </Button>
          <Text fontSize={"small"} fontWeight="medium" mb={4}>
            Or continue with
          </Text>
          <Button
            w="full"
            py={6}
            size="sm"
            leftIcon={<FcGoogle fontSize={"25px"} />}
            onClick={() => login()}
          >
            Sign In With Google
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
