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
            <Link to="/posts">All Tales</Link>
          </li>
          <li>
            <Link to="/categories">All Genres</Link>
          </li>
          <li>
            <Link to="/tags">All Authors</Link>
          </li>
        </SidebarWrapper>
        <SidebarWrapper>
          <li>
            <Link to="/post/create">Create new tale</Link>
          </li>
          <li>
            <Link to="/category/create">Create new genre</Link>
          </li>
          <li>
            <Link to="/tag/create">Create new author</Link>
          </li>
        </SidebarWrapper>
      </SidebarLink>
    );
  };
  
  export default SidebarLinks;