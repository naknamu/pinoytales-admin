import { useEffect, useState } from "react";
import config from "../config";
import styled from "styled-components";
import { Link } from "react-router-dom";

const GenreStyled = styled.div`
  display: grid;
  gap: 1rem;
`;

const AllGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchAllGenres = async () => {
      const response = await fetch(`${config.apiUrl}/genres`);
      const data = await response.json();

      setGenres(data);
    };

    fetchAllGenres();
  }, []);

  return (
    <GenreStyled>
      <h1>All genres</h1>
      {genres.map((genre) => (
        <li key={genre._id}>
          <Link to={`${genre.slug}`}>{genre.name}</Link>
        </li>
      ))}
    </GenreStyled>
  );
};

export default AllGenres;
