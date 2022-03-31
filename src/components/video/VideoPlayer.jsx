import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";
import {
  MdReplay10,
  MdOutlineForward10,
  MdPause,
  MdVolumeOff,
  MdVolumeUp,
  MdFullscreen,
} from "react-icons/md";
import { logo } from "../../assets/images";
import screenfull from "screenfull";
import {
  Box,
  Center,
  Flex,
  Image,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";

const format = (miliseconds) => {
  if (isNaN(miliseconds)) {
    return "00:00";
  }

  const date = new Date(miliseconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  return `${mm}:${ss}`;
};

const VideoPlayer = ({ video }) => {
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const playerRef = useRef(null);
  const playerContainer = useRef(null);

  const currentTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";

  const duration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";

  const formatCurrentTime = format(currentTime);
  const formatDuration = format(duration);

  const onVolumeChange = (e) => {
    setVolume(parseFloat(e / 100));
    e === 0 ? setMute(true) : setMute(false);
  };

  const handleReplay = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleForward = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleProgress = (change) => {
    if (!seeking) {
      setTime(parseFloat(change.played / 100) * 100);
    }
  };

  const handleSeekChange = (e) => {
    setTime(parseFloat(e / 100));
  };

  const onSeekMouseDown = (e) => {
    setSeeking(true);
  };

  const onSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current?.seekTo(e / 100);
  };

  return (
    <Flex
      w="full"
      borderRadius="32"
      overflow="hidden"
      pos="relative"
      ref={playerContainer}
    >
      <ReactPlayer
        ref={playerRef}
        url={video?.videoUrl}
        width="100%"
        height="100%"
        playing={playing}
        muted={mute}
        volume={volume}
        onProgress={handleProgress}
      />
      <Flex
        pos="absolute"
        inset="0"
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        zIndex="0"
      >
        <Center
          w="full"
          h="full"
          onClick={() => {
            setPlaying(!playing);
          }}
        >
          {!playing && <FaPlay fontSize="60" color="#fff" />}
        </Center>
        <Flex
          w="full"
          alignItems="center"
          direction="column"
          bgGradient="linear(to-t, blackAlpha.800, blackAlpha.400, blackAlpha.50)"
          px={2}
          py={4}
        >
          <Slider
            onChange={handleSeekChange}
            onMouseDown={onSeekMouseDown}
            onChangeEnd={onSeekMouseUp}
            aria-label="slider-ex-4"
            value={(time * 100).toString()}
            min={0}
            max={100}
            borderRadius="md"
          >
            <SliderTrack bg="messenger.50">
              <SliderFilledTrack bg="messenger.500" />
            </SliderTrack>
            <SliderThumb
              boxSize={3}
              bg="messenger.500"
              transition="ease-in-out"
              transitionDuration="0.2"
            />
          </Slider>
          <Flex
            alignItems="center"
            w="full"
            my={2}
            gap={10}
            color="#fff"
            px={2}
          >
            <MdReplay10 fontSize={30} cursor="pointer" onClick={handleReplay} />
            <Box onClick={() => setPlaying(!playing)}>
              {!playing || formatCurrentTime === formatDuration ? (
                <FaPlay fontSize="20" />
              ) : (
                <MdPause fontSize="30" />
              )}
            </Box>
            <MdOutlineForward10
              fontSize={30}
              cursor="pointer"
              onClick={handleForward}
            />
            <Flex alignItems="center">
              <Box
                onClick={() => {
                  !mute && setVolume(0);
                  setMute(!mute);
                }}
              >
                {mute ? (
                  <MdVolumeOff fontSize="30" />
                ) : (
                  <MdVolumeUp fontSize="30" />
                )}
              </Box>
              <Slider
                onChange={onVolumeChange}
                onMouseDown={onVolumeChange}
                onChangeEnd={onVolumeChange}
                aria-label="slider-ex-1"
                value={(volume * 100).toString()}
                min={0}
                max={100}
                size="sm"
                borderRadius="md"
                w="16"
                mx="2"
              >
                <SliderTrack bg="messenger.50">
                  <SliderFilledTrack bg="messenger.500" />
                </SliderTrack>
                <SliderThumb boxSize={2} bg="messenger.500" />
              </Slider>
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Text fontSize="16">{formatCurrentTime}</Text>
              <Text fontSize="16">/</Text>
              <Text fontSize="16">{formatDuration}</Text>
            </Flex>
            <Flex alignItems={"center"} ml="auto">
              <Image src={logo} boxSize="32px" objectFit="cover" mr={2} />
              <Text fontWeight={"bold"}>Video.</Text>
            </Flex>
            <MdFullscreen
              fontSize="30"
              onClick={() => {
                screenfull.toggle(playerContainer.current);
                //setFullScreen(!fullScreen)
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VideoPlayer;
