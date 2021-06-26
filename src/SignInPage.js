import React, { useState, useEffect, useCallback } from "react";
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

  useEffect(() => {

    if (isLoading) {
      logIn();
      setIsLoading(false);
    }
  }, [isLoading, logIn]);

  useEffect(() => {}, []);


  if (isLoading) {
    return (
      <h1>loading</h1> //TODO: create loading spinner
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
