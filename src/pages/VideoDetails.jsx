import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../components/loading/LoadingPage";
import { firebaseApp } from "../firebase-config";
import {
  deleteVideo,
  getRecommendedVideos,
  getVideoByID,
} from "../services/videos.service";
import { getCategoryByID } from "../services/categories.service";
import { defaultAvatar } from "../assets/images";
import { MdAdd, MdOutlineClose } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { CgMore, CgTrash } from "react-icons/cg";
import { FcOk } from "react-icons/fc";
import parse from "html-react-parser";
import { getUserByID } from "../services/users.service";
import { CommentItem, RecommendedVideos, VideoPlayer } from "../components";
import moment from "moment";
import Modal from "react-modal";
import { ref, deleteObject, getStorage } from "firebase/storage";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "default",
    background: "transparent",
    borderRadius: "20px",
    padding: "0",
    border: "0",
    width: "446px",
    height: "fit-content",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.39)",
  },
};

Modal.setAppElement("#root");

const VideoDetails = () => {
  const { id } = useParams("id");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(false);
  const storage = getStorage(firebaseApp);

  const bg = useColorModeValue("white", "var(--main-dark)");
  const border = useColorModeValue("#F0F3F6", "rgba(240, 243, 246, 0.1)");

  const handleCloseModal = () => {
    setOpen(false);
  };

  const _deleteVideo = () => {
    setLoading(true);
    const deleteRef = ref(storage, video?.videoUrl);
    deleteVideo(id);
    deleteObject(deleteRef)
      .then(() => {
        setLoading(false);
        toast.success("Deleted successfully");
        navigate("/");
      })
      .catch((error) => {
        setAlert(true);
        toast.error("Deleted failed");
      });
  };

  useEffect(() => {
    setLoading(true);
    getVideoByID(id).then((response) => {
      if (response) {
        setVideo(response);
        if (response?.userID) {
          getUserByID(response.userID).then((response) => {
            setUser(response);
            // console.log(user);
          });
        }
        if (response?.categoryID) {
          getCategoryByID(response.categoryID).then((response) => {
            setCategory(response);
          });
          getRecommendedVideos(response.categoryID, id).then((response) => {
            setRecommended(response);
          });
        }

        setLoading(false);
      } else navigate("/");
      // console.log(videos);
    });
  }, []);

  if (loading) return <LoadingPage msg="Please wait to loading page" />;

  return (
    <>
      <Flex
        w="full"
        h="auto"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Box bg={bg} borderRadius="32px" shadow="lg" overflow="hidden">
          <VideoPlayer video={video} />
          <Flex
            direction="column"
            p="8"
            borderBottom="1px"
            borderColor={border}
          >
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
            <Box
              as="h4"
              fontSize="32px"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {video?.title}
            </Box>
            <Text mb="2" fontSize="12px" color="#808191">
              {moment(new Date(parseInt(video?.date)).toUTCString()).fromNow()}
            </Text>
            {video?.description && (
              <Box fontSize="14px" color="#808191">
                {parse(`${video?.description}`)}
              </Box>
            )}
          </Flex>
          {user?.uid !== video?.userID ? (
            <Flex p="8" alignItems="center" gap="8px">
              <Flex
                alignItems="center"
                bg="rgba(228, 228, 228, 0.25)"
                py={4}
                px={5}
                borderRadius="2xl"
                w="fit-content"
                fontSize="16px"
                gap="10px"
                fontWeight="bold"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ background: "#FF6A55", color: "#fff" }}
                onClick={() => setOpen(true)}
              >
                <CgTrash fontSize="24px" />
                Delete
              </Flex>
              <Modal
                isOpen={open}
                onRequestClose={handleCloseModal}
                style={customStyles}
                contentLabel="Confirm delete"
              >
                <Box
                  bg={bg}
                  w="full"
                  h="full"
                  p="8"
                  borderRadius="20"
                  border="1px"
                  borderColor={border}
                >
                  <Circle
                    onClick={handleCloseModal}
                    pos="absolute"
                    top="-18px"
                    right="-18px"
                    bg={bg}
                    cursor="pointer"
                    w="9"
                    h="9"
                    border="1px"
                    borderColor={border}
                  >
                    <MdOutlineClose className="text-neutral-400" />
                  </Circle>
                  <Box
                    as="h4"
                    fontSize="32px"
                    pb="3"
                    borderBottom="1px"
                    borderColor={border}
                  >
                    Confirmation
                  </Box>
                  <Box mt="3">Are you sure to delete it?</Box>
                  <Flex justifyContent="flex-end" mt="6" w="full" gap="3">
                    <Button>Cancel</Button>
                    <Button colorScheme="red" onClick={() => _deleteVideo()}>
                      Delete
                    </Button>
                  </Flex>
                </Box>
              </Modal>
            </Flex>
          ) : (
            <Flex p="8" alignItems="center" gap="8px">
              <Flex
                alignItems="center"
                bg="rgba(228, 228, 228, 0.25)"
                py={4}
                px={5}
                borderRadius="2xl"
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
              <Flex
                alignItems="center"
                bg="rgba(228, 228, 228, 0.25)"
                py={4}
                px={5}
                borderRadius="2xl"
                w="fit-content"
                fontSize="16px"
                gap="10px"
                fontWeight="bold"
                cursor="pointer"
              >
                <MdAdd fontSize="24px" />
                Add to Playlist
              </Flex>
              <Menu>
                <MenuButton
                  bg="rgba(228, 228, 228, 0.25)"
                  py={4}
                  px={4}
                  borderRadius="2xl"
                  fontSize="16px"
                  fontWeight="bold"
                  cursor="pointer"
                >
                  <CgMore fontSize="24px" />
                </MenuButton>
                <MenuList>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={video?.videoUrl}
                    download
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MenuItem>Download</MenuItem>
                  </a>

                  <MenuItem>Report</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}
        </Box>
        <Flex mt="56px" gap="8">
          <Box flex="2" mr="3">
            <Flex gap="7" w="full">
              <Avatar
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
              <Flex justifyContent="space-between" w="full">
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
                    Asperiores, maiores ipsam beatae natus quo officiis
                    architecto saepe, perferendis molestias fuga atque,
                    voluptates sunt molestiae modi dolorem suscipit distinctio
                    magnam commodi?
                  </Text>
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
            </Flex>
            <Flex
              p="32px"
              borderRadius="24px"
              direction="column"
              mt="12"
              bg={bg}
              overflow="hidden"
              w="full"
            >
              <Box as="h5" mb="7" fontSize="24px" fontWeight="medium">
                Comments
              </Box>
              <CommentItem />
            </Flex>
          </Box>
          <Box flex="1">
            <Box as="h6" mb="6" fontSize="18px" fontWeight="medium">
              Recommended videos
            </Box>
            <Flex direction="column" gap="4" w="full">
              {recommended.length > 0 &&
                recommended.map((item) => <RecommendedVideos video={item} />)}
            </Flex>
          </Box>
        </Flex>
      </Flex>
      {alert && <ToastMsg />}
    </>
  );
};

export default VideoDetails;
