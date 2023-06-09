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
import AuthorDetail from "./pages/AuthorDetails";
import TaleForm from "./pages/TaleForm";
import TaleUpdateForm from "./pages/TaleUpdateForm";
import GenreForm from "./pages/GenreForm";
import GenreUpdateForm from "./pages/GenreUpdateForm";
import AuthorForm from "./pages/AuthorForm";
import AuthorUpdateForm from "./pages/AuthorUpdateForm";

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
            <Route path="/" element={<Home />} />

            <Route path="/tales" element={<AllTales />} />
            <Route path="/tales/:taletitle" element={<TaleDetail />} />
            <Route path="/tale/create" element={<TaleForm />} />
            <Route path="/tales/:taleid/update" element={<TaleUpdateForm />} />

            <Route path="/genres" element={<AllGenres />} />
            <Route path="/genres/:genrename" element={<GenreDetail />} />
            <Route path="/genre/create" element={<GenreForm />} />
            <Route path="/genre/:genreid/update" element={<GenreUpdateForm />} />

            <Route path="/authors" element={<AllAuthors />} />
            <Route path="/authors/:authorname" element={<AuthorDetail />} />
            <Route path="/author/create" element={<AuthorForm />} />
            <Route path="/author/:authorid/update" element={<AuthorUpdateForm />} />

          </Routes>
        </PagesWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
