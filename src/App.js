import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// Pages
import Home from "./pages/Home";

// Components 
import SidebarLinks from "./components/SidebarLinks";

const PagesWrapper = styled.div`
  padding-inline: 15rem;
  margin-bottom: 5rem;
  max-width: 1200px;
`;

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <SidebarLinks />
        <PagesWrapper>
          <Routes>
            <Route path="/" element={ <Home />} />
          </Routes>
        </PagesWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
