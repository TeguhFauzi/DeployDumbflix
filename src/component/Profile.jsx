import { useContext, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import User from "../assets/image/BlankProfile.jpg"
import Email from "../assets/image/Email.png";
import VIP from "../assets/image/VIP Ticket.png";
import Gender from "../assets/image/Gender.png";
import Phone from "../assets/image/Phone.png";
import Place from "../assets/image/Place.png";
import Vektor from "../assets/image/Vector.png";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import ModalUpdate from "./ModalUpdates";

export default function Profile() {
  const [showShipping, setShowShipping] = useState(null);
  const [showSuccess, setShowsuccess] = useState(null);

  const handleShowShipping = () => setShowShipping(true);
  const handleCloseShipping = () => setShowShipping(false);

  const popSuccess = () => {
    setShowsuccess(true);
    setShowShipping(false);
  };

  const [state] = useContext(UserContext);

  const title = "Profile";
  document.title = "Dumbflix | " + title;


  let { data: profile } = useQuery('profileCache', async () => {
    const response = await API.get(`/profile`);
    return response.data.data;
  }, {refetchInterval : 1000});
  
  console.log(profile)

  return (
    <>
    <Container className="mt-5 pt-5 w-50">
      <div className="rounded" style={{padding:"1px", backgroundColor:"#1F1F1F"}}>
       <div className="d-flex">
          <div>
            <h4 className="text-white fw-bold mt-5 ms-5 mb-4">Personal Info</h4>
            <div className="ps-5 d-flex align-items-center">
                <div className="mb-3">
                  <img src={Vektor}  width="30px" alt="Vektor" />
                </div>
                <div>
                  <p className="text-light fw-semibold ps-3">{state.user.fullname} <br></br> <p className="fw-light" style={{color:"#8A8C90"}}>Fullname</p></p>
                </div>
            </div>
            <div className="ps-5 d-flex align-items-center">
                <div className="mb-3">
                  <img src={Email} width="30px" alt="Vektor" />
                </div>
                <div>
                  <p className="text-light fw-semibold ps-3">{state.user.email} <br></br> <p className="fw-light" style={{color:"#8A8C90"}}>Email</p></p>
                </div>
            </div>
            <div className="ps-5 d-flex align-items-center">
                <div className="mb-3">
                  <img src={VIP} width="30px" alt="Vektor" />
                </div>
                <div>
                  <p className="text-light fw-semibold ps-3">Active <br></br> <p className="fw-light" style={{color:"#8A8C90"}}>Status</p></p>
                </div>
            </div>
            <div className="ps-5 d-flex align-items-center">
                <div className="mb-3">
                  <img src={Gender} width="30px" alt="Vektor" />
                </div>
                <div>
                  <p className="text-light fw-semibold ps-3">{state.user.gender} <br></br> <p className="fw-light" style={{color:"#8A8C90"}}>Gender</p></p>
                </div>
            </div>
            <div className="ps-5 d-flex align-items-center">
                <div className="mb-3">
                  <img src={Phone} width="30px" alt="Vektor" />
                </div>
                <div>
                  <p className="text-light fw-semibold ps-3">{state.user.phone} <br></br> <p className="fw-light" style={{color:"#8A8C90"}}>Mobile Phone</p></p>
                </div>
            </div>
            <div className="ps-5 d-flex align-items-center mb-5">
            <div className="mb-3">
              <img src={Place} width="30px" alt="Vektor" />
            </div>
            <div>
              <p className="text-light fw-semibold ps-3">{state.user.address} <br></br> <p className="fw-light" style={{color:"#8A8C90"}}>Address</p></p>
            </div>
            </div>
          </div>
          <div className="d-grid ms-auto p-5 mb-2">
              <img src={profile?.photo ? `${profile.photo}` : User} className="mt-2 rounded-2" style={{objectFit:"cover"}} width="300px" height="370px" alt="Profile" />
              <Button className="border-0" type="submit" onClick={handleShowShipping} style={{backgroundColor:"#E50914"}}>Change Photo Profile</Button> 
          </div>
       </div> 
      </div>
    </Container>
    <ModalUpdate show={showShipping} onHide={handleCloseShipping} handleSuccess={popSuccess} />
    </>
  );
}
