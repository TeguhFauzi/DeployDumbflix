// import { useState } from "react";
// import { Container } from "react-bootstrap";
// import { useQuery } from "react-query";
// import { NavLink } from "react-router-dom";
// import EditFilm from "./EditFilm";
// import { API } from "../config/api";


// export default function UpdateFilms() {
//   const [showModal, setShowModal] = useState(false);
//   const [categoryId, setCategoryId] = useState(null);
  

//   let { data: films } = useQuery("filmCache", async () => {
//     const response = await API.get("/films");
//     return response.data.data;
//   });

//   let { data: categories } = useQuery("categoryCache", async () => {
//     const response = await API.get("/categories");
//     return response.data.data;
//   });

//   let ascFilms = [];
//   if (films !== undefined) {
//     ascFilms = [...films];
//     ascFilms.sort((a, b) => b.id - a.id);
//   }

//   const filteredFilms = categoryId
//     ? ascFilms.filter((item) => item.category_id === categoryId)
//     : ascFilms;

//   return (
//     <>
//       <Container className="">
//         <>
//           <div className="mt-5">
//             <h3 className="fw-bold text-light">Films</h3>
//             <div className="d-flex justify-content-between">
//               <div style={{ display: "flex", alignItems: "center",margin:"15px 0" }}>
//                 <h4>List Films:</h4>
//                 <select
//                   className="form-select-sm mx-3"
//                   aria-label=".form-select-sm example"
//                   defaultValue={null}
//                   onChange={(e) => setCategoryId(parseInt(e.target.value))}
//                 >
//                   <option value={null}>All Categories</option>
//                   {categories?.map((category) => (
//                     <option key={category.id} value={category.id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div style={{ display: "flex", alignItems: "center",margin:"15px 0"}}>
//                 <button className="buttonAdd" onClick={() => setShowModal(true)}>
//                   Add Film
//                 </button>
//               </div>
//             </div>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>Thumbnail</th>
//                 <th>Title</th>
//                 <th>Year</th>
//                 <th>Category</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredFilms?.map((item) => {
//                 return (
//                   <NavLink
//                     to={`/detail/${item.id}`}
//                     className="text-decoration-none"
//                     key={item.id}
//                   >
//                     <tr>
//                       <td>
//                         <img
//                           className="rounded"
//                           src={`http://localhost:5000/uploads/${item.thumbnailfilm}`}
//                           width="200px"
//                           height="300px"
//                           style={{ objectFit: "cover" }}
//                           alt="Card"
//                         />
//                       </td>
//                       <td>{item.title}</td>
//                       <td>{item.year}</td>
//                       {/* <td>{item.category.name}</td> */}
//                     </tr>
//                   </NavLink>
//                 );
//               })}
//             </tbody>
//           </table>
//         </>
//       </Container>
//       <EditFilm show={showModal} onHide={() => setShowModal(false)} />
//     </>
//   );
// }
