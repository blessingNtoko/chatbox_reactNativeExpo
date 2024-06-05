import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // will check if user is authenticated or not
    useEffect(() => {
        // onAuthStateChanged
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log("Authenticated User ::", user)
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        // clear hook when component unmounts
        return unsub;
    }, []);

    async function login(email, password) {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            return {success: true};
        } catch (error) {
            let msg = error.message;

            if (msg.includes("(auth/invalid-email)")) msg = "Your email is invalid. Please try again.";
            if (msg.includes("(auth/invalid-credential)")) msg = "The details you have entered are incorrect. Please try again.";
            if (msg.includes("(auth/weak-password)")) msg = "Password should be at least 6 characters long. Please try again.";

            return {success: false, message: msg};
        }
    }

    async function logout() {
        try {
            await signOut(auth);
            return { success: true }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async function register(name, email, password) {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(`response.user : ${response?.user}`);

            // setUser(response?.user);
            // setIsAuthenticated(true);

            // store user details
            await setDoc(doc(db, "users", response?.user.uid), {
                name,
                email,
                status: "",
                phoneNumber: "",
                profileImg: "",
                media: [],
                userId: response?.user.uid
            });

            return {success: true, data: response?.user};
        } catch (error) {
            let msg = error.message;

            if (msg.includes("(auth/invalid-email)")) msg = "Your email is invalid.";
            if (msg.includes("(auth/email-already-in-use)")) msg = "This email is already in use.";
            if (msg.includes("(auth/weak-password)")) msg = "Password should be at least 6 characters long.";

            return {success: false, message: msg};
        }
    }

    return (
        //All the state and function that will be received in the children components should be the value
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error("useAuth must be wrapped inside AuthContextProvider");
    }

    return value;
}