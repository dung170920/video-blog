import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../firebase-config";

const db = getFirestore(firebaseApp);

export const getUserByID = async (id) => {
  const docRef = doc(db, "users", id);
  const user = await getDoc(docRef);

  if (user.exists()) {
    return user.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("Can't find user!");
  }
};
