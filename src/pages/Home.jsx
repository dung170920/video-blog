import { Grid } from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import LoadingPage from "../components/loading/LoadingPage";
import VideoItem from "../components/video/VideoItem";
import { firebaseApp } from "../firebase-config";
import ToastMsg from "../components/toast/ToastMsg";
import { getAllVideos } from "../services/videos.service";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState(null);
  const db = getFirestore(firebaseApp);
  useEffect(() => {
    setLoading(true);
    getAllVideos(db).then((response) => {
      setLoading(false);
      setVideos(response);
      // console.log(videos);
    });
  }, []);

  if (loading) return <LoadingPage msg="Please wait to loading page" />;

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {videos?.length > 0 &&
          videos
            .slice(0, 3)
            .map((video) => <VideoItem key={video.id} video={video} />)}
      </Grid>
      {alert && <ToastMsg />}
    </>
  );
};

export default Home;
