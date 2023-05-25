import Navbar from "../component/Navbar";
import Jumbotron from "../component/JumbotronMV";
import FooterCardMovies from "../component/CardMovies";
import { UserContext } from "../context/userContext";
import { useContext} from "react";
export default function Movies() {
  const [state] = useContext(UserContext);
  return (
    <>
      <Navbar />
      {!state.isLogin ? null :  (
      <Jumbotron />
      )}
      <FooterCardMovies />
    </>  
  );
}
