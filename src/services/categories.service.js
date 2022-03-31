import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { firebaseApp } from "../firebase-config";

const db = getFirestore(firebaseApp);

export const getAllCategories = async () => {
  const categories = await getDocs(
    query(collection(db, "categories"), orderBy("ID", "asc"))
  );
  return categories.docs.map((doc) => doc.data());
};

export const getCategoryByID = async (id) => {
  const docRef = doc(db, "categories", id.toString());
  const category = await getDoc(docRef);

  if (category.exists()) {
    return category.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("Can't find category!");
  }
};
