import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import {
  DeleteBtn,
  UpdateBtn,
  ButtonWrapper,
} from "../components/StyledComponents";
import { useNavigate } from "react-router";

const GenreDetail = () => {
  const { genrename } = useParams();
  const [genre, setGenre] = useState(null);
  const [tales, setTales] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenre = async () => {
      const response = await fetch(`${config.apiUrl}/genres/${genrename}`);
      const data = await response.json();

      setGenre(data.genre);
      setTales(data.tale_list);
    };
    fetchGenre();
  }, [genrename]);

  const handleDelete = async (genreid) => {
    const response = await fetch(
      `${config.apiUrl}/genre/${genreid}/delete`,
      {
        method: "POST"
      }
    );
    const data = await response.json();

    if (response.ok) {
      navigate("/genres");
    } else {
      console.error(data.error);
    }
  };

  const handleUpdate = (genreid) => {
    navigate(`/genre/${genreid}/update`);
  }

  if (!genre && !tales) {
    return <div>Loading....</div>;
  }

  return (
    <div className="genre-detail">
      <h1>Genre: {genre.name}</h1>

      <h2>Tales under this genre:</h2>
      {!tales.length && <h3 style={{ color: "#AA4A44" }}>None</h3>}
      {tales.map((tale) => (
        <li key={tale._id}>
          <Link to={`/tales/${tale.slug}`}>{tale.title}</Link>
        </li>
      ))}

      <ButtonWrapper>
        <DeleteBtn onClick={() => handleDelete(genre._id)}>
          Delete
        </DeleteBtn>

        <UpdateBtn onClick={() => handleUpdate(genre._id)}>
          Update
        </UpdateBtn>
      </ButtonWrapper>
    </div>
  );
};

export default GenreDetail;
