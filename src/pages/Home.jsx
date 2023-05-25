import FooterCard from "../component/Card";
import Jumbotron from "../component/Jumbotron";
import Navbar from "../component/Navbar";
import { UserContext } from "../context/userContext";
import { useContext,useState,useEffect } from "react";
import { API, setAuthToken } from "../config/api";
export default function Home() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
      console.log("User")
    } else {
      setIsLoading(false);
    }
  }, []);
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  

  return (
    <>
    <Navbar />

    {!state.isLogin || state.user.is_admin ? null :  (
      <Jumbotron  />
    )}

    <FooterCard />
  </>
  );
}
