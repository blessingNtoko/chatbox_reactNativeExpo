import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { updateProfile, updateEmail, updatePhoneNumber } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // will check if user is authenticated or not
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    // clear hook when component unmounts
    return unsub;
  }, []);

  async function updateUserData(userID) {
    try {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let data = docSnap.data();

        setUser({
          ...user,
          displayName: data.displayName,
          photoURL: data.photoURL,
          status: data.status,
          media: data.media,
          email: data.email,
          phoneNumber: data.phoneNumber,
          userId: data.userId,
        });
      }
    } catch (error) {}
  }

  async function login(email, password) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      return { success: true };
    } catch (error) {
      let msg = error.message;

      if (msg.includes("(auth/invalid-email)"))
        msg = "Your email is invalid. Please try again.";
      if (msg.includes("(auth/invalid-credential)"))
        msg = "The details you have entered are incorrect. Please try again.";
      if (msg.includes("(auth/weak-password)"))
        msg =
          "Password should be at least 6 characters long. Please try again.";

      return { success: false, message: msg };
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async function register(displayName, email, password) {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response?.user.uid), {
        displayName,
        email,
        status: "",
        phoneNumber: "",
        photoURL: "",
        media: [],
        userId: response?.user.uid,
      });

      return { success: true, data: response?.user };
    } catch (error) {
      let msg = error.message;

      if (msg.includes("(auth/invalid-email)")) msg = "Your email is invalid.";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "This email is already in use.";
      if (msg.includes("(auth/weak-password)"))
        msg = "Password should be at least 6 characters long.";

      return { success: false, message: msg };
    }
  }

  async function updateUser(displayName = user?.displayName, photoURL = "") {
    const docRef = doc(db, "users", user?.userId);

    await updateDoc(docRef, {
      displayName,
      photoURL,
    });

    await updateUserData(user?.userId);
  }

  async function updateUserEmail(email) {
    const docRef = doc(db, "users", user?.userId);

    await updateDoc(docRef, {
      email,
    });

    await updateUserData(user?.userId);
  }

  async function updateUserPhoneNumber(phoneNumber) {
    const docRef = doc(db, "users", user?.userId);

    await updateDoc(docRef, {
      phoneNumber,
    });

    await updateUserData(user?.userId);
  }

  async function updateStatus(status) {
    const docRef = doc(db, "users", user?.userId);

    await updateDoc(docRef, {
      status,
    });

    await updateUserData(user?.userId);
  }

  return (
    //All the state and function that will be received in the children components should be the value
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        updateStatus,
        register,
        logout,
        updateUserEmail,
        updateUserPhoneNumber,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }

  return value;
};
