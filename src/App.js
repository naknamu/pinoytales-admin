import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// Pages
import Home from "./pages/Home";
import AllTales from "./pages/AllTales";
import AllGenres from "./pages/AllGenres";
import AllAuthors from "./pages/AllAuthors";

// Components 
import SidebarLinks from "./components/SidebarLinks";
import TaleDetail from "./pages/TaleDetail";
import GenreDetail from "./pages/GenreDetail";

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

            <Route path="/tales" element={ <AllTales />} />
            <Route path="/tales/:taletitle" element={ <TaleDetail />} />

            <Route path="/genres" element={ <AllGenres />} />
            <Route path="/genres/:genrename" element={ <GenreDetail />} />

            <Route path="/authors" element={ <AllAuthors />} />
          </Routes>
        </PagesWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
