import { useEffect, useState } from "react";
import config from "../config";
import styled from "styled-components";

const AuthorStyled = styled.div`
  display: grid;
  gap: 1rem;
`;

const AllAuthors= () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAllAuthors= async () => {
          const response = await fetch(`${config.apiUrl}/authors`);
          const data = await response.json();
    
          setAuthors(data);
        };
    
        fetchAllAuthors();
    }, []);

    return ( 
        <AuthorStyled>
            <h1>All authors</h1>
            {authors.map((author) => (
                <li key={author._id}>
                <a href="/">{author.name}</a>
                </li>
            ))}
        </AuthorStyled>
     );
}
 
export default AllAuthors;