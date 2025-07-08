import {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserData } from "../firebaseConfig";
import ApiService from "../services/api";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isloggedin, setIsloggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (authUser) => {
      console.log("auth state changed", authUser);

      if (authUser) {
        setUser(authUser);
        setIsloggedin(true);
        setUserData(await getUserData(authUser.uid));
        setProfilePic(await ApiService.getProfilePicture(authUser.uid));
      } else {
        setUser(null);
        setIsloggedin(false);
        setUserData(null);
        setProfilePic(null);
      }
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  /*useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      console.log("auth state changed", authUser);

      if (authUser) {
        setUser(authUser);
        setIsloggedin(true);

        try {
          // Get user data from Firebase
          const userDataFromDB = await getUserData(authUser.uid);
          setUserData(userDataFromDB);
          console.log("Username:", userData);

          // Get profile pic from your backend API
          const profilePicUrl = await ApiService.getProfilePicture(
            authUser.uid
          );
          setProfilePic(profilePicUrl);
        } catch (error) {
          console.error("Error loading user data:", error);
          setUserData(null);
          setProfilePic(null);
        }
      } else {
        setUser(null);
        setIsloggedin(false);
        setUserData(null);
        setProfilePic(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);*/

  return (
    <GlobalContext.Provider
      value={{
        isloggedin,
        setIsloggedin,
        user,
        setUser,
        isLoading,
        userData,
        profilePic,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
