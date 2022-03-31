import { Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getAllVideos } from "../../services/videos.service";
import LoadingPage from "../loading/LoadingPage";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllVideos().then((response) => {
      setLoading(false);
      setVideos(response);
      // console.log(videos);
    });
  }, []);

  if (loading) return <LoadingPage msg="Please wait to loading page" />;
  return (
    <Grid templateColumns="repeat(3, 1fr)" rowGap={12} columnGap={6}>
      {videos?.length > 0 &&
        videos.map((video) => <VideoItem key={video.id} video={video} />)}
    </Grid>
  );
};

export default VideoList;
