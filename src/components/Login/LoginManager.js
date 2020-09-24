import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const googleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((response) => {
      const user = response.user;
      console.log(user);
      return user;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};

export const googleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((response) => {
      const user = "";
      return user;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};

export const facebookSignIn = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then((response) => {
      const fbUser = response.user;
      console.log("Facebook response : ", fbUser);
      return fbUser;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

export const facebookSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((response) => {
      const user = "";
      return user;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const githubSignIn = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((response) => {
      const gitUser = response.user;
      console.log(gitUser);
      return gitUser;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

export const githubSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((response) => {
      const user = "";
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const twitterSignIn = () => {
  const twitterProvider = new firebase.auth.TwitterAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(twitterProvider)
    .then((response) => {
      const user = response.user;
      console.log(user);
      return user;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const twitterSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((response) => {
      const user = "";
      return user;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export const createAccountWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const newUserInfo = response.user;
      newUserInfo.errorMessage = "";
      newUserInfo.success = true;
      // updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.errorMessage = error.message;
      newUserInfo.success = false;
      console.log(error.message);
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const newUserInfo = response.user;
      newUserInfo.success = true;
      newUserInfo.errorMessage = "";
      return newUserInfo;
    })
    .catch((err) => {
      const newUserInfo = {};
      newUserInfo.success = false;
      newUserInfo.errorMessage = err.message;
      return newUserInfo;
    });
};
