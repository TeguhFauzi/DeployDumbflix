import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { API } from "../config/api";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

function EditFilm({ show, onHide, selectedFilm, onSave }) {
  const [filmData, setFilmData] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setFilmData(selectedFilm);
  }, [selectedFilm]);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setFilmData({
        ...filmData,
        [name]: files,
      });

      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
    } else {
      setFilmData({
        ...filmData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFilmData({
      ...filmData,
      [name]: value,
    });
  };

  const { data: categories } = useQuery("categoryCache", async () => {
    const response = await API.get("/categories");
    return response.data.data;
  });

  const updateFilm = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.set("title", filmData.title);
      formData.set("description", filmData.description);
      formData.set("year", filmData.year);
      formData.set("category_id", filmData.category_id);
      formData.set("linkfilm", filmData.linkfilm);

      if (filmData.thumbnailfilm) {
        formData.set("thumbnailfilm", filmData.thumbnailfilm[0]);
      }
      onSave(formData);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await API.patch(
        `/film/${selectedFilm.id}`,
        formData,
        config
      );

      console.log("update film success : ", response);
      onHide();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Update Film Success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Update Film Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Film</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={updateFilm}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={filmData?.title || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              type="text"
              className="form-control"
              id="year"
              name="year"
              value={filmData?.year || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category_id"
              name="category_id"
              value={filmData?.category_id || ""}
              onChange={handleSelectChange}
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="linkfilm" className="form-label">
              Year
            </label>
            <input
              type="text"
              className="form-control"
              id="linkfilm"
              name="linkfilm"
              value={filmData?.linkfilm || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="thumbnailfilm" className="form-label">
              Thumbnail Film
            </label>
            <input
              type="file"
              className="form-control"
              id="thumbnailfilm"
              name="thumbnailfilm"
              onChange={handleInputChange}
            />

          </div>

          <button type="submit" className="btn btn-primary">
            Update Film
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditFilm;
