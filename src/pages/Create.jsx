import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown, BiChevronUp, BiUpload } from "react-icons/bi";
import { RiErrorWarningFill, RiCloseFill } from "react-icons/ri";
import LoadingUpload from "../components/loading/LoadingUpload";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "../firebase-config";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllCategories } from "../services/categories.service";
import { v4 as uuid } from "uuid";
import { LoadingPage } from "../components";

const schema = yup.object({
  title: yup.string().required().max(100, "Maximum 100 characters."),
  video: yup.string().required(),
  category: yup.string().required(),
});

const Create = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(false);
  const bg = useColorModeValue("white", "var(--main-dark)");
  const bgEditor = useColorModeValue("light", "oxide-dark");
  const bgUpload = useColorModeValue("gray.100", "whiteAlpha.50");
  const bgTooltip = useColorModeValue("var(--main-dark)", "white");
  const storage = getStorage(firebaseApp);
  const editorRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const db = getFirestore(firebaseApp);

  const getDescriptionValue = () => {
    if (editorRef.current) {
      setDescription(editorRef.current.getContent());
    }
  };

  const uploadVideo = (e) => {
    setLoading(true);
    const upload = e.target.files[0];
    const storageRef = ref(storage, `Video/${Date.now()}-${upload.name}`);
    const uploadTask = uploadBytesResumable(storageRef, upload);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        setAlert(true);
        toast.error("Uploaded failed");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideo(downloadURL);
          setLoading(false);
          setAlert(true);
          toast.success("Uploaded successfully");
        });
      }
    );
  };

  const deleteVideo = () => {
    setAlert(false);
    const deleteRef = ref(storage, video);
    deleteObject(deleteRef)
      .then(() => {
        setVideo(null);
        setAlert(true);
        toast.success("Deleted successfull");
      })
      .catch((error) => {
        setAlert(true);
        toast.error("Deleted failed");
      });
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        id: `${uuid()}`,
        date: `${Date.now()}`,
        title,
        userID: userInfo?.uid,
        categoryID: category?.ID,
        videoUrl: video,
        description,
      };
      console.log(data);

      await setDoc(doc(db, "videos", `${data.id}`), data);
      setLoading(false);
      navigate("/browse");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setAlert(true);
      toast.error("Create failed");
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllCategories().then((response) => {
      setLoading(false);
      setCategories(response);
      //console.log(response);
    });
  }, []);

  if (loading) return <LoadingPage msg="Please wait to loading page" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb="7">
        <Heading fontSize="40" mb="6">
          Add new video
        </Heading>
        <Flex
          bg={bg}
          p="6"
          borderRadius="8"
          gap="6"
          direction="column"
          mb="10px"
        >
          <Heading fontSize="20">Name & description</Heading>
          <Box>
            <Flex alignItems="center" mb="14px">
              <Text fontWeight="semibold" mr="2">
                Video title
              </Text>
              <Tooltip
                bg={bgTooltip}
                shouldWrapChildren
                placement="top"
                label="Maximum 100 characters. No emoji allowed"
              >
                <RiErrorWarningFill color="#9A9FA5" />
              </Tooltip>
            </Flex>
            <Input
              p="5"
              id="title"
              {...register("title")}
              value={title}
              borderRadius="12"
              onChange={(e) => setTitle(e.target.value)}
              size="sm"
              variant="filled"
              errorBorderColor="red"
            />
            <Text mt="3" color="red" fontWeight="semibold" fontSize="md">
              {errors.title?.message}
            </Text>
          </Box>
          <Box>
            <Flex alignItems="center" mb="14px">
              <Text fontWeight="semibold" mr="2">
                Description
              </Text>
              <Tooltip
                bg={bgTooltip}
                shouldWrapChildren
                placement="top"
                label="Can empty"
              >
                <RiErrorWarningFill color="#9A9FA5" />
              </Tooltip>
            </Flex>
            <Editor
              id="description"
              onChange={getDescriptionValue}
              apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | fontselect fontsizeselect formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist checklist outdent indent | " +
                  "removeformat | preview | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; resixe:none; }",
                // content_css: `${bgEditor === "dark" ? "dark" : ""}`,
                // skin: bgEditor,
              }}
            />
          </Box>
        </Flex>
        <Flex bg={bg} p="6" borderRadius="8" gap="6" direction="column">
          <Heading fontSize="20">Video & category</Heading>
          <Box>
            <Flex alignItems="center" mb="14px">
              <Text fontWeight="semibold" mr="2">
                Video
              </Text>
              <Tooltip
                bg={bgTooltip}
                shouldWrapChildren
                placement="top"
                label="Required"
              >
                <RiErrorWarningFill color="#9A9FA5" />
              </Tooltip>
            </Flex>
            <Flex
              overflow="hidden"
              borderRadius="12"
              bg={bgUpload}
              w="full"
              h="400px"
              alignItems="center"
              justifyContent="center"
              {...register("video")}
              id="video"
              value={video}
            >
              {video ? (
                <Box h="full" w="full" pos="relative">
                  <Flex
                    pos="absolute"
                    right="15px"
                    top="15px"
                    zIndex="10"
                    cursor="pointer"
                    onClick={deleteVideo}
                    h="40px"
                    w="40px"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <RiCloseFill color="white" fontSize="20" />
                  </Flex>

                  <video
                    controls
                    src={video}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Box>
              ) : (
                <FormLabel
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  htmlFor="file"
                  h="full"
                  w="full"
                >
                  {loading ? (
                    <LoadingUpload
                      msg="Uploading your video"
                      progress={progress}
                    />
                  ) : (
                    <Flex
                      alignItems="center"
                      w="auto"
                      h="48px"
                      px="20px"
                      borderRadius="12px"
                      fontWeight="bold"
                      shadow="lg"
                      bg={bg}
                      border="2px"
                      borderColor={bgUpload}
                    >
                      <BiUpload fontSize="20" />
                      <Text ml="4">Click or drop video</Text>
                      <input
                        id="file"
                        type="file"
                        hidden
                        onChange={uploadVideo}
                        accept="video/mp4,video/x-m4v, video/*"
                      />
                    </Flex>
                  )}
                </FormLabel>
              )}
            </Flex>
            <Text mt="3" color="red" fontWeight="semibold" fontSize="md">
              {errors.video?.message}
            </Text>
          </Box>
          <Box>
            <Flex alignItems="center" mb="14px">
              <Text fontWeight="semibold" mr="2">
                Category
              </Text>
              <Tooltip
                bg={bgTooltip}
                shouldWrapChildren
                placement="top"
                label="Category"
              >
                <RiErrorWarningFill color="#9A9FA5" />
              </Tooltip>
            </Flex>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    w="full"
                    p="3"
                    borderRadius="12"
                    border="2px solid #dbdbdb"
                    _active={{ border: "2px solid gray" }}
                    value={category?.ID}
                    id="category"
                    {...register("category")}
                  >
                    <Flex alignItems="center" justifyContent="space-between">
                      {category ? category.name : "Select Category"}
                      {!isOpen ? (
                        <BiChevronDown fontSize="20px" />
                      ) : (
                        <BiChevronUp fontSize="20px" />
                      )}
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    {categories?.length > 0 &&
                      categories.map((item) => (
                        <MenuItem
                          key={item.ID}
                          onClick={() => setCategory(item)}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                  </MenuList>
                  <Text mt="3" color="red" fontWeight="semibold" fontSize="md">
                    {errors.category?.message}
                  </Text>
                </>
              )}
            </Menu>
          </Box>
        </Flex>
      </Box>
      <Box bg={bg} p="10" position="absolute" right="0" left="252px">
        {loading ? (
          <Button
            mr="auto"
            bg="messenger.500"
            color="white"
            type="submit"
            disabled
          >
            <Spinner mr="3" />
            Publish now
          </Button>
        ) : (
          <Button bg="messenger.500" color="white" type="submit">
            Publish now
          </Button>
        )}
      </Box>

      {alert && <ToastMsg />}
    </form>
  );
};

export default Create;
