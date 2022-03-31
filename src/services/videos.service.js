import {
  collection,
  deleteDoc,
  doc,
  endAt,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { firebaseApp } from "../firebase-config";

const db = getFirestore(firebaseApp);

export const getAllVideos = async () => {
  const videos = await getDocs(
    query(collection(db, "videos"), limit(6), orderBy("date", "desc"))
  );

  return videos.docs.map((doc) => doc.data());
};

export const getVideosByUserID = async (userID) => {
  const videos = await getDocs(
    query(
      collection(db, "videos"),
      where("userID", "==", userID),
      orderBy("date", "desc")
    )
  );

  return videos.docs.map((doc) => doc.data());
};

export const getVideosByCategoryID = async (categoryID) => {
  const videos = await getDocs(
    query(
      collection(db, "videos"),
      where("categoryID", "==", categoryID),
      orderBy("date", "desc")
    )
  );

  return videos.docs.map((doc) => doc.data());
};

export const getVideoByID = async (id) => {
  const video = await getDoc(doc(db, "videos", id));
  if (video.exists()) {
    return video.data();
  } else {
    console.log("Can't find video!");
  }
};

export const deleteVideo = async (id) => {
  await deleteDoc(doc(db, "videos", id));
};

export const getRecommendedVideos = async (categoryID, videoId) => {
  const videos = await getDocs(
    query(
      collection(db, "videos"),
      where("categoryID", "==", categoryID),
      where("id", "!=", videoId),
      limit(6),
      orderBy("id", "desc")
    )
  );
  return videos.docs.map((doc) => doc.data());
};
