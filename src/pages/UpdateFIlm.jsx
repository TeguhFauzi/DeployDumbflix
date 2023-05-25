import Card from "../component/Card";
import Navbar from "../component/Navbar";
// import UpdateList from "../component/UpdateProduct";
import UpdateFilms from "../component/UpdateFilms";
export default function UpdateFilm() {
  return (
    <div className="UpdateProducts">
      <Navbar />
      <UpdateFilms />
      <Card />
    </div>
  );
}
