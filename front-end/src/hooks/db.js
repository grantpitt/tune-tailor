import firebase from "../firebase";
import { getFirestore, collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firestore = getFirestore(firebase);

const storage = getStorage(firebase);

const db = {
  async get() {
    const snapshot = await getDocs(collection(firestore, "posts"));
    const posts = snapshot.docs.map((post) => ({
      ...post.data(),
      id: post.id,
    }));
    return posts;
  },

  async post(image, post) {
    const imageRef = await uploadBytes(ref(storage, post.user.image), image);
    post.user.url = await getDownloadURL(imageRef.ref);
    post.createdAt = Timestamp.now()
    await addDoc(collection(firestore, "posts"), post);
  },
};

export default db;
