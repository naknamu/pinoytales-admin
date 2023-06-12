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

const AuthorDetail = () => {
  const { authorname } = useParams();
  const [author, setAuthor] = useState(null);
  const [tales, setTales] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      const response = await fetch(`${config.apiUrl}/authors/${authorname}`);
      const data = await response.json();

      setAuthor(data.author);
      setTales(data.tale_list);
    };
    fetchAuthor();
  }, [authorname]);

  const handleDelete = async (authorid) => {
    const response = await fetch(
      `${config.apiUrl}/author/${authorid}/delete`,
      {
        method: "POST"
      }
    );
    const data = await response.json();

    if (response.ok) {
      navigate("/authors");
    } else {
      console.error(data.error);
    }
  };

  const handleUpdate = (authorid) => {
    navigate(`/author/${authorid}/update`);
  }

  if (!author && !tales) {
    return <div>Loading....</div>;
  }

  return (
    <div className="author-detail">
      <h1>Author: {author.name}</h1>

      <h2>Tales under this author:</h2>
      {!tales.length && <h3 style={{ color: "#AA4A44" }}>None</h3>}
      {tales.map((tale) => (
        <li key={tale._id}>
          <Link to={`/tales/${tale.slug}`}>{tale.title}</Link>
        </li>
      ))}

      <ButtonWrapper>
        <DeleteBtn onClick={() => handleDelete(author._id)}>
          Delete
        </DeleteBtn>

        <UpdateBtn onClick={() => handleUpdate(author._id)}>
          Update
        </UpdateBtn>
      </ButtonWrapper>
    </div>
  );
};

export default AuthorDetail;
