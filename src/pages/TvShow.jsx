import Navbar from "../component/Navbar";
import Jumbotron from "../component/JumbotronTV";
import FooterCardTV from "../component/CardTV";
import { UserContext } from "../context/userContext";
import { useContext} from "react";
export default function TvShows() {
  const [state, dispatch] = useContext(UserContext);
  return (
    <>
      <Navbar />
      {!state.isLogin ? null :  (
      <Jumbotron />
      )}
      <FooterCardTV />
    </>  
  );
}
