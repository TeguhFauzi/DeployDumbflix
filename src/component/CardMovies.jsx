import {useContext, useState } from "react";
import {  Container } from "react-bootstrap";
import { useQuery, queryCache } from "react-query";
import { Link, NavLink } from "react-router-dom";
import EditFilm from "../component/EditFilm";
import { API, setAuthToken } from "../config/api";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/userContext";

export default function Card() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [categoryId, setCategoryId] = useState(1);
  const [idFilmToDelete, setIdFilmToDelete] = useState(null);
  const [ascFilms, setAscFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  let { data: films } = useQuery("filmCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });

  let { data: categories } = useQuery("categoryCache", async () => {
    const response = await API.get("/categories");
    return response.data.data;
  });

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

  useEffect(() => {
    if (films) {
      const sortedFilms = [...films].sort((a, b) => b.id - a.id);
      setAscFilms(sortedFilms);
      setFilteredFilms(categoryId ? sortedFilms.filter((film) => film.category_id === categoryId) : sortedFilms);
    }
  }, [categoryId, films]);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      console.log("apa")
      if (state.isLogin === false) {
        console.log("s")
        // navigate("/");
      }
    }
  }, [isLoading]);

  
  const handleDeleteFilm = async (id) => {
    try {
      const response = await API.delete(`/film/${id}`);
  
      // Update state ascFilms and filteredFilms
      const updatedFilms = ascFilms.filter((film) => film.id !== id);
      setAscFilms(updatedFilms);
      setFilteredFilms(categoryId ? updatedFilms.filter((film) => film.category_id === categoryId) : updatedFilms);
      console.log(response.data.message);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Film Success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Delete Film Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };
  
  useEffect(() => {
    idFilmToDelete && handleDeleteFilm(idFilmToDelete);
  }, [idFilmToDelete]);
  
  const handleShowModal = (film) => {
    setSelectedFilm(film);
    setShowModal(true);
  };

  const handleEditFilm = async (data) => {
    try {
      const response = await API.patch(`/film/${selectedFilm.id}`, data);

      setSelectedFilm(response.data.data);

      // Update state films
      const updatedFilms = ascFilms.map((film) => {
        if (film.id === response.data.data.id) {
          return response.data.data;
        } else {
          return film;
        }
      });
      setAscFilms(updatedFilms);
      setFilteredFilms(categoryId ? updatedFilms.filter((film) => film.category_id === categoryId) : updatedFilms);

      queryCache.setQueryData("films", updatedFilms);

      setShowModal(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Edit Film Success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Edit Film Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };
  return (
    <>
      <Container className="">
        <>
      
          <div className={!state.isLogin || state.user.is_admin? "mt-5 pt-5" : "mt-5"}>
            <h3 className="fw-bold text-light">Movies</h3>
            <div className="d-flex justify-content-between">
              {state.isLogin === true && state.user.is_admin === true && (
                <div style={{ display: "flex", alignItems: "center", margin: "15px 0" }}>
                  <Link to="/addmovies">
                    <button className="buttonAdd">Add Film</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-lg-start justify-content-center mt-4" id="wrap">
            {filteredFilms?.map((item) => {
              return (
                <>
                  <NavLink to={`/detail/${item.id}`} className="text-decoration-none d-flex" style={{marginRight:"20px"}} key={item.id}>
                    <div className="" style={{ width: "200px"}}>
                      <div>
                        <img
                          className="rounded"
                          src={`${item.thumbnailfilm}`}
                          width="200px"
                          height="300px"
                          style={{ objectFit: "cover" }}
                          alt="Card"
                        />
                      </div>
                      <h5 className="fw-bold text-light mt-3">{item.title}</h5>
                      <p className="text-light">{item.year}</p>
                    </div>   
                  </NavLink>
                </>
              );
            })}
          </div>
        </>
      </Container>
      <EditFilm show={showModal} onHide={() => setShowModal(false)} selectedFilm={selectedFilm} onSave={handleEditFilm}/>
    </>
  );
}
