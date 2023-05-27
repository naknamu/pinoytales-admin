import { useEffect, useState } from "react";
import config from "../config";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TaleStyled = styled.div`
  display: grid;
  gap: 1rem;
`;

const AllTales = () => {
    const [tales, setTales] = useState([]);

    useEffect(() => {
        const fetchAllTales = async () => {
          const response = await fetch(`${config.apiUrl}/tales`);
          const data = await response.json();
    
          setTales(data);
        };
    
        fetchAllTales();
    }, []);

    return ( 
        <TaleStyled>
            <h1>All tales</h1>
            {tales.map((tale) => (
                <li key={tale._id}>
                <Link to={`${tale.slug}`}>{tale.title}</Link>
                </li>
            ))}
        </TaleStyled>
     );
}
 
export default AllTales;