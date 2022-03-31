import { Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideosByUserID } from "../../services/videos.service";
import LoadingPage from "../loading/LoadingPage";
import VideoItem from "../video/VideoItem";

const UserVideos = () => {
  const { id } = useParams("id");

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getVideosByUserID(id)
      .then((response) => {
        setVideos(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingPage msg="Please wait to loading videos" />;

  return (
    <Grid templateColumns="repeat(3, 1fr)" rowGap={12} columnGap={6}>
      {videos?.length > 0 &&
        videos.map((video) => <VideoItem key={video.id} video={video} />)}
    </Grid>
  );
};

export default UserVideos;
