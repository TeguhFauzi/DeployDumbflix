import { useContext, useState } from "react";
import { Button, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

export default function Jumbotrons() {
  const [state] = useContext(UserContext);
  const [showLogin, setShowLogin]=useState(false);

  // Fetching Film data from database
  let { data: films } = useQuery("filmCache", async () => {
    const response = await API.get("/films");
    console.log(response.data.data)
    return response.data.data;
  });



  let asceding = [];
  if (films !== undefined) {
    //operator spread
    asceding = [...films];
    //sort use methods descending for value id
    asceding.sort((a, b) => b.id - a.id);
  }
  return (
    <Container className="mt-3 pt-4 rounded">

    <Carousel>
    {asceding?.map((item) => {
    return (
      <Carousel.Item style={{paddingInline:"50px",paddingTop:"40px"}}>
        <img key={item.id} className="d-block w-100 rounded" src={`${item.thumbnailfilm}`} style={{height:"450px"}} alt="First slide"/>
        <Carousel.Caption className='mb-5'>
  <div className="container">
    <div className="row">
      <div className="col-sm">
        <h1 className="fw-bold" style={{fontSize:"30px", textAlign: "center", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)"}}>{item.title}</h1>
        <div style={{paddingLeft:"10px", paddingRight:"10px"}}>
          <p style={{textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)', textAlign: "center"}}>{item.description}</p>
          <div className="d-flex gap-3 justify-content-center">
            <p>{item.year}</p>
            <p className="border border-2 rounded pe-3 ps-3 shadow-lg">{item?.category.name}</p>
          </div>
          <NavLink to={`/detail/${item.id}`} className="text-decoration-none">
            <Button style={{ backgroundColor: "#E50914", border: "none", paddingLeft: "20px", paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px" }}>Watch Now!</Button>
          </NavLink>
        </div>
      </div>
    </div>
  </div>
</Carousel.Caption>

      </Carousel.Item>
      );
    })}
      </Carousel>
    </Container>
  );
}
