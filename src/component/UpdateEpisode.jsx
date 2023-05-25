import Modal from "react-modal";
import { useState } from "react";
import { FaRegEdit} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { API } from "../config/api";
import { useEffect } from "react";

function UpdateEpisodeModal({ isOpen, closeModal, selectedEpisode,refetch }) {
  const [episodeData, setEpisodeData] = useState({});
  const [imageUrl, setImageUrl] = useState("");
 

  useEffect(() => {
    setEpisodeData(selectedEpisode);
  }, [selectedEpisode]);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setEpisodeData({
        ...episodeData,
        [name]: files,
      });

      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
    } else {
      setEpisodeData({
        ...episodeData,
        [name]: value,
      });
    }
  };

  const updateEpisode = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", episodeData.title);
      formData.append("linkfilm", episodeData.linkfilm);

      if (episodeData.thumbnailfilm) {
        formData.append("thumbnailfilm", episodeData.thumbnailfilm[0]);
      }
      // onSave(formData);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await API.patch(
        `/episode/${selectedEpisode.id}`,
        formData,
        config
      );

      console.log("update Episode success : ", response);
 
closeModal()
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Update Episode Success",
        showConfirmButton: false,
        timer: 2000,
      });
      refetch()
    } catch (error) {
      console.log(error);

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Update Episode Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

 

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
      <h2 style={{ color: "yellow", marginBottom: "20px" }}>
        <FaRegEdit /> Edit Episode
      </h2>
      <form onSubmit={updateEpisode}>
        <div className="form-group">
          <label style={{ color: "red", fontSize: "16px", marginBottom: "5px" }} htmlFor="title">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="episodeTitle"
            placeholder="Masukan Title"
            name="title"
            value={episodeData?.title || ""}
            onChange={handleInputChange}
            style={{ borderRadius: "5px", padding: "8px" }}
          />
        </div>
        <div className="form-group">
          <label style={{ color: "red", fontSize: "16px", marginBottom: "5px" }} htmlFor="episodeLink">
            Thumbnail Film
          </label>
          <input
            type="file"
            className="form-control"
            placeholder="asdas"
            cursor="pointer"
            id="episodeLink"
            name="thumbnailfilm"
        onChange={handleInputChange}
            style={{ borderRadius: "5px", padding: "8px" }}
          />
        </div>

        <div className="form-group">
          <label style={{ color: "red", fontSize: "16px", marginBottom: "5px" }} htmlFor="episodeLink">
            Link Film
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukan Link"
            id="episodeLink"
            name="linkfilm"
            value={episodeData?.linkfilm || ""}
            onChange={handleInputChange}
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

export default UpdateEpisodeModal;
