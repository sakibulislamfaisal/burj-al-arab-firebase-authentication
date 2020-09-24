import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { userContext } from "../../App";
import "./Login.css";
import {
  facebookSignIn,
  facebookSignOut,
  githubSignIn,
  githubSignOut,
  googleSignIn,
  googleSignOut,
  initializeFramework,
  twitterSignIn,
  twitterSignOut,
  createAccountWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./LoginManager";

const Login = () => {
  initializeFramework();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    success: false,
    errorMessage: "",
  });
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    googleSignIn().then((response) => {
      setLoggedInUser(response);
      history.replace(from);
    });
  };

  const handleGoogleSignOut = () => {
    googleSignOut().then((response) => {
      setLoggedInUser(response);
    });
  };

  const handleFacebookSignIn = () => {
    facebookSignIn().then((response) => {
      setLoggedInUser(response);
      history.replace(from);
    });
  };

  const handleFacebookSignOut = () => {
    facebookSignOut().then((response) => {
      setLoggedInUser(response);
    });
  };

  const handleGithubSignIn = () => {
    githubSignIn().then((response) => {
      setLoggedInUser(response);
      history.replace(from);
    });
  };

  const handleGithubSignOut = () => {
    githubSignOut().then((response) => {
      setLoggedInUser(response);
    });
  };

  const handleTwitterSignIn = () => {
    twitterSignIn().then((response) => {
      setLoggedInUser(response);
      history.replace(from);
    });
  };

  const handleTwitterSignOut = () => {
    twitterSignOut().then((response) => {
      setLoggedInUser(response);
    });
  };
  const handleChange = (event) => {
    let isFieldValid = true;
    if (event.target.name === "name") {
      //console.log(event.target.name, event.target.value);
      isFieldValid = /^[a-zA-Z ]{2,30}$/.test(event.target.value);
    }
    if (event.target.name === "email") {
      //console.log(event.target.name, event.target.value);
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      // console.log(event.target.name, event.target.value);
      isFieldValid = /\d{1}/.test(event.target.value);
    }
    if (isFieldValid === true) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
      console.log(newUserInfo);
    }
  };
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createAccountWithEmailAndPassword(
        user.name,
        user.email,
        user.password
      ).then((res) => {
        setUser(res);
        setLoggedInUser(res);
        // history.replace(from);
      });
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((response) => {
        setUser(response);
        setLoggedInUser(response);
        // history.replace(from);
      });
    }

    event.preventDefault();
  };

  return (
    <div className="login-container">
      {user.success ? (
        <h2 style={{ color: "green" }}>
          User is {newUser ? "Created " : "Logged In "}Successfully
        </h2>
      ) : (
        <h2 style={{ color: "red" }}>{user.errorMessage}</h2>
      )}

      {loggedInUser.displayName ? (
        <button onClick={handleGoogleSignOut}>Google SignOut</button>
      ) : (
        <button onClick={handleGoogleSignIn}>Google SignIn</button>
      )}
      {loggedInUser.displayName ? (
        <button onClick={handleFacebookSignOut}>Facebook SignOut</button>
      ) : (
        <button onClick={handleFacebookSignIn}>Facebook SignIn</button>
      )}
      {loggedInUser.displayName ? (
        <button onClick={handleGithubSignOut}>Github SignOut</button>
      ) : (
        <button onClick={handleGithubSignIn}>Github SignIn</button>
      )}
      {loggedInUser.displayName ? (
        <button onClick={handleTwitterSignOut}>Twitter SignOut</button>
      ) : (
        <button onClick={handleTwitterSignIn}>Twitter SignIn</button>
      )}
      <br />
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login Form </h1>
        <input
          type="checkbox"
          name="checkbox"
          onClick={() => setNewUser(!newUser)}
        />
        {newUser && (
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            onChange={handleChange}
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <br />
        <input
          type="tex"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
