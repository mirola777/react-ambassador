import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const signInWithGoogle = async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBxzszPYAU-dzBa2PHSGc3uHfn0ZRq96Vs",
    authDomain: "ambassador-76973.firebaseapp.com",
    projectId: "ambassador-76973",
    storageBucket: "ambassador-76973.appspot.com",
    messagingSenderId: "696977530114",
    appId: "1:696977530114:web:3d66278342535fd4edb61b",
    measurementId: "G-217E7GG5ZS",
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  // whenever a user interacts with the provider, we force them to select an account
  provider.setCustomParameters({
    prompt: "select_account ",
  });
  const auth = getAuth();

  const result = await signInWithPopup(auth, provider);

  const idToken = await result.user.getIdToken();

  try {
    await axios.post("auth/google", { idToken });

    axios.defaults.headers.Authorization = `Bearer ${idToken}`;

    localStorage.setItem("token", idToken);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
