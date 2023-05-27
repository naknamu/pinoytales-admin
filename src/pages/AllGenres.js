import { useEffect, useState } from "react";
import config from "../config";
import styled from "styled-components";

const GenreStyled = styled.div`
  display: grid;
  gap: 1rem;
`;

const AllGenres= () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchAllGenres= async () => {
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
                <a href="/">{genre.name}</a>
                </li>
            ))}
        </GenreStyled>
     );
}
 
export default AllGenres;