import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
export const db = getFirestore(app);
const postsCollectionRef = collection(db, "posts");

export function login() {
  signInWithPopup(auth, provider)
    .then((res) => {
      window.location.href = "/";
    })
    .catch(); //
}

export function logout() {
  signOut(auth).then(localStorage.clear()).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function addNewProduct(product, image) {
  const id = uuid();
  await set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(","),
  });
}

export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}

export async function signUp(email, password, displayName) {
  createUserWithEmailAndPassword(auth, email, password) //
    .then(async (res) => {
      const user = res.user;
      await updateProfile(user, {
        displayName: displayName,
        photoURL: "https://res.cloudinary.com/dy1qcvfew/image/upload/v1675690959/bros_blank_oz59ec.jpg",
      });
      window.location.href = "/";
    });
}

export async function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (res) => {
      await (window.location.href = "/");
    })
    .catch((error) => Swal.fire("로그인 실패", "이메일또는 패스워드를 다시 확인해주세요!", "error"));
}

export function resetPassword(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      Swal.fire("이메일 전송 완료", "입력하신 이메일을 확인해주세요", "success");
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      Swal.fire("이메일 전송 실패", "이메일을 다시 확인해주세요!", "error");
    });
}

export async function userUpdate(name, photo) {
  const user = auth.currentUser;
  await updateProfile(user, {
    displayName: name,
    photoURL: photo,
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
}

export function pwUpdate(password) {
  updatePassword(password)
    .then(() => {
      // Update successful;
    })
    .catch((error) => {
      // An error ocurred
      // ...
    });
}

export async function userProfile() {
  const user = auth.currentUser;
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  localStorage.clear();
  localStorage.setItem("name", displayName);
  localStorage.setItem("photo", photoURL);
  localStorage.setItem("email", email);
}

export async function postUpdate(id, name, title, htmlContent) {
  if (id) {
    const listDoc = doc(db, "posts", id);
    const editField = { title: title, content: htmlContent, createdAt: new Date() };
    await updateDoc(listDoc, editField);
  } else {
    await addDoc(postsCollectionRef, { write: name, title: title, content: htmlContent, createdAt: new Date(), like: 0 });
  }
}

export async function postDelete(id) {
  const listDoc = doc(db, "posts", id);
  await deleteDoc(listDoc);
}
