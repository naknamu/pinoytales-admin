import { useEffect, useState } from "react";
import config from "../config";
import { useNavigate } from "react-router";
import styled from "styled-components";
import MarkdownEditor from "../components/MarkdownEditor";
import {
  InputField,
  FormWrapper,
  SubmitBtn,
} from "../components/StyledComponents";
import BannerInput from "../components/BannerInput";

const SelectField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  select {
    font-family: inherit;
    padding: 0.5rem 2rem;
    font-size: 1rem;
    align-self: flex-start;
  }

  select:focus {
    border: 1px solid hsl(175, 98%, 24%);
    outline: none;
  }
`;

const GenresField = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  div > * {
    padding-inline: 5px;
  }

  input {
    transform: scale(1.2);
  }
`;

const BannerButton = styled.button`
  height: 50px;
  width: 50px;
  border: none;
  background: #1e3f66;
  color: white;
  font-size: 28px;
  font-weight: 700;
  border-radius: 50%;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 1;
  }
`;

const BannerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TaleUpdateForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [bannerUrl, setBannerUrl] = useState([]);

  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [checkedGenres, setCheckedGenres] = useState([]);

  const [bannerCounter, setBannerCounter] = useState([0]);
  const navigate = useNavigate();

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTale = {
      title,
      content,
      author: selectedAuthor,
      genre: checkedGenres,
      banner_url: bannerUrl,
    };

    console.log(newTale);

    const response = await fetch(`${config.apiUrl}/tale/create`, {
      method: "POST",
      body: JSON.stringify(newTale),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Redirect to list of tales
      navigate("/tales");
    } else {
      console.error(data.error);
    }
  };

  const handleCheckbox = (e) => {
    let isChecked = e.target.checked;

    // if checked, adds genre to the array
    // else, removed genre to the array
    if (isChecked) {
      setCheckedGenres((genre) => [...genre, e.target.value]);
    } else {
      let _tempArray = checkedGenres;
      let _filteredArray = _tempArray.filter(
        (genre) => genre !== e.target.value
      );
      setCheckedGenres(_filteredArray);
    }
  };

  const handleBanner = (e) => {
    setBannerUrl((banner) => [...banner, e.target.value]);
  };

  const handleAddBanner = () => {
    setBannerCounter([...bannerCounter, bannerCounter.length]);
  };

  useEffect(() => {
    const fetchAuthorsAndGenres = async () => {
      const [authors, genres] = await Promise.all([
        (await fetch(`${config.apiUrl}/authors`)).json(),
        (await fetch(`${config.apiUrl}/genres`)).json(),
      ]);

      setAuthors(authors);
      setGenres(genres);
    };

    fetchAuthorsAndGenres();
  }, []);

  return (
    <>
      <h1>Create a Tale</h1>
      <FormWrapper onSubmit={(e) => handleSubmit(e)}>
        <InputField>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </InputField>

        <SelectField>
          <label htmlFor="author">Author: </label>
          <select
            name="author"
            id="author"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            required
          >
            <option value="" disabled>
              Select the author
            </option>
            {authors?.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
        </SelectField>

        <label>Genres: </label>
        <GenresField>
          {genres?.map((genre) => (
            <div key={genre._id}>
              <input
                type="checkbox"
                name="genres"
                id={genres._id}
                value={genre._id}
                onChange={(e) => handleCheckbox(e)}
              />
              <label htmlFor="genres">{genre.name}</label>
            </div>
          ))}
        </GenresField>

        <label htmlFor="bannerUrl">Banner URL: </label>
        {bannerCounter &&
          bannerCounter.map((element, index) => (
            <BannerWrapper key={index}>
              <BannerInput handleBanner={handleBanner} />
              <BannerButton type="button" onClick={handleAddBanner}>
                +
              </BannerButton>
            </BannerWrapper>
          ))}

        <InputField>
          <label htmlFor="content">Content:</label>
          <MarkdownEditor markdown={content} handleChange={handleChange} />
        </InputField>

        <SubmitBtn type="submit">Submit</SubmitBtn>
      </FormWrapper>
    </>
  );
};

export default TaleUpdateForm;
