import React, { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "./LoadingSpinner";
import "./SignInPage.css";
import { signInWithGoogle } from "./firebase";
import { useHistory } from "react-router-dom";
import { fetchApiKey, createUser } from "./util";
import { useSelector, useDispatch } from "react-redux";

//renders sign in form
function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((st) => st.user);
  const dispatch = useDispatch();
  const history = useHistory();


  //sign in with google to firebase, fetch api key from backend, create user in backend 
  const logIn = useCallback(async () => {
    const userGoogle = await signInWithGoogle();
    const { displayName, email, uid } = userGoogle;

    const fullUser = {
      name: displayName,
      email,
      firebase_uid: uid,
    };

    const key = await fetchApiKey();
    dispatch({type:"LOGIN", user:fullUser, key});
    await createUser(fullUser, key);

  },[dispatch])

  //useEffect to log in
  useEffect(() => {

    if (isLoading) {
      logIn();
      setIsLoading(false);
    }
  }, [isLoading, logIn]);



  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

if(user) {
  history.push('/audio')
}

  return (
    <div className="sign-in-form">
      <h2>WELCOME!</h2>
      <button onClick={() => setIsLoading(true)}>
        <span> Continue with Google</span>
      </button>
    </div>
  );
}

export default SignInPage;
