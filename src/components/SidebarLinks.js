import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarLink = styled.div`
  display: grid;
  position: fixed;
  gap: 1rem;
  margin-top: 1rem;
`;

const SidebarWrapper = styled.ul`
  margin: 0;

  li {
    list-style-type: none;
    padding-block: 10px;
  }

  li a {
    text-decoration: none;
  }
`;


const SidebarLinks = () => {

    return (
      <SidebarLink>
        <SidebarWrapper>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tales">All Tales</Link>
          </li>
          <li>
            <Link to="/genres">All Genres</Link>
          </li>
          <li>
            <Link to="/authors">All Authors</Link>
          </li>
        </SidebarWrapper>
        <SidebarWrapper>
          <li>
            <Link to="/tale/create">Create new tale</Link>
          </li>
          <li>
            <Link to="/genre/create">Create new genre</Link>
          </li>
          <li>
            <Link to="/author/create">Create new author</Link>
          </li>
        </SidebarWrapper>
      </SidebarLink>
    );
  };
  
  export default SidebarLinks;