import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Profile from "../assets/image/BlankProfile.jpg"
import { API } from "../config/api";
import { useMutation } from "react-query";
import Swal from "sweetalert2";


export default function Updates(props) {
    let navigate = useNavigate();
    const [state] = useContext(UserContext);
    const [imageUrl, setImageUrl] = useState(Profile)

    const [formUpdateProfile, setFormUpdateProfile] = useState({
      photo : ""
    });

    async function getDataUpdateProfile(){
        const responseProfile = await API.get("/profile");
        if (responseProfile.data.profile.photo !== "");
            setImageUrl(responseProfile.data.profile.photo);
    }

    useEffect(() =>{
        getDataUpdateProfile();
    }, []);

    const handleChange = (e) => {
        console.log(e.target.files)
        setFormUpdateProfile({
            ...formUpdateProfile,
            [e.target.name] : e.target.type === "file" ? e.target.files : e.target.value,
        });

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setImageUrl(url);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault();
    
          // Configuration
          const config = {
            headers: {
              "Content-type": "multipart/form-data",
            },
          };
    
          // Store data with FormData as object
          const formData = new FormData();

          if (formUpdateProfile.photo) {
            formData.set("photo", formUpdateProfile?.photo[0], formUpdateProfile?.photo[0]?.name);
          }
    
          // await disini berfungsi untuk menunggu sampai promise tersebut selesai dan mengembalikkan hasilnya
          const response = await API.patch("/profile", formData, config);
          console.log(response.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Update Photo Success",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.log(error);
        }
      });

 return (
    <>
    <Container>
            <h3 className="d-flex text-light fw-bold mb-4 mt-1 justify-content-center">Update Photo Profile</h3>
                <Form onSubmit={(e) => handleSubmit.mutate(e)} className="bg-dark rounded border-0">
                    <Form.Control
                        name="photo"
                        onChange={handleChange}
                        type="file"
                        accept="image/*"
                        placeholder="Name"
                        className="mb-3"
                    /> 
                    <div className="d-grid mb-3">
                    <Button style={{ backgroundColor: "#E50914", border: "none" }} type="submit">Save</Button>
                    </div>
                </Form>
            </Container>
    </>
)
}