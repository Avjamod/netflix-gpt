import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";
import lang from "../utils/langaugeConstants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState([]);
  const dispatch = useDispatch((store) => store.user);
  const langKey = useSelector((store) => store.config.lang);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleClickButton = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    // const nameValue = isSignIn ? null : name.current.value;

    const message = checkValidData(emailValue, passwordValue);
    setErrorMessage(message);

    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="">
      <Header />
      <div className="absolute ">
        <img alt="background Image" src={BG_URL} />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black w-4/12 p-8 absolute flex flex-col my-32 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-75"
      >
        <h1 className="text-white font-bold text-2xl py-4">
          {isSignIn ? lang[langKey].signin : lang[langKey].signup}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            className="my-4 p-4 w-full bg-gray-700"
            type="text"
            placeholder={lang[langKey].name}
            required
          />
        )}
        <input
          ref={email}
          className="my-4 p-4 w-full bg-gray-700"
          type="text"
          placeholder={lang[langKey].email}
          required
        />
        <input
          ref={password}
          type="password"
          placeholder={lang[langKey].password}
          className="my-4 p-4 w-full bg-gray-700"
          required
        />
        <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
        <button
          className="my-4 p-4 bg-red-600 w-full"
          onClick={handleClickButton}
        >
          {isSignIn ? lang[langKey].signin : lang[langKey].signup}
        </button>
        <p className="py-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignIn ? lang[langKey].signinMessage : lang[langKey].signupMessage}
        </p>
      </form>
    </div>
  );
};

export default Login;
