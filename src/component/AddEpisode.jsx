import Modal from "react-modal";
import { useState } from "react";
import { FaPlus} from "react-icons/fa";
import { API } from "../config/api";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";


function AddEpisodeModal({ isOpen, closeModal,refetch }) {
  const [addFilms, setAddFilms] = useState({});
  const {id} = useParams()
  function handleSubmit(event) {
    event.preventDefault();
    closeModal();
  }
console.log(addFilms)
  const handleChange = (e) => {
    setAddFilms({
      ...addFilms,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const addButtonHandler = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // console.log(form);

      const formData = new FormData();
      formData.set("title", addFilms.title);
      formData.set("linkfilm", addFilms.linkfilm);
      formData.set("film_id", id)
      formData.set(
        "thumbnailfilm",
        addFilms?.thumbnailfilm[0],
        addFilms?.thumbnailfilm[0]?.name  
      );

      console.log(formData);
      // Configuration Content-type

      // Insert data user to database
      const response = await API.post("/episode", formData, config);
      console.log("add episode success : ", response);

      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Add Film Success",
        showConfirmButton: false,
        timer: 2000,
      });
      closeModal(true)
      refetch()
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Add Film Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      border: "none",
      borderRadius: "5px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
      padding: "20px",
      background: "#343a40",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Episode Modal"
      style={customStyles}
    >
      <h2 style={{ color: "Chartreuse", marginBottom: "20px" }}><FaPlus/> Add Episode</h2>
      <form onSubmit={(e)=> addButtonHandler.mutate(e)}>
        <div className="form-group">
          <label style={{ color: "white", fontSize:"14px", marginBottom: "5px" }} htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="episodeTitle"
            placeholder="Masukan Title"
            name="title"
            onChange={handleChange}
            style={{ borderRadius: "5px", padding: "8px" }}
          />
        </div>
        <div className="form-group">
          <label style={{ color: "white", fontSize: "14px", marginBottom: "5px" }} htmlFor="episodeLink">
            Thumbnail Film
          </label>
          <input
            type="file"
            className="form-control"
            placeholder="asdas"
            cursor="pointer"
            id="episodeLink"
            name="thumbnailfilm"
            onChange={handleChange}
            style={{ borderRadius: "5px", padding: "8px" }}
          />
        </div>

        <div className="form-group">
          <label style={{ color: "white", fontSize: "14px", marginBottom: "5px" }} htmlFor="episodeLink">
            Link Film
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukan Link"
            id="episodeLink"
            name="linkfilm"
            onChange={handleChange}
            style={{ borderRadius: "5px", padding: "8px" }}
          />
        </div>

        <button type="submit" className="btn btn-danger" style={{ marginTop: "20px" }}>
          Submit
        </button>
      </form>
    </Modal>
  );
}

export default AddEpisodeModal;
