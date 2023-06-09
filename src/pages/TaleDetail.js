import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import {
  DeleteBtn,
  UpdateBtn,
  ButtonWrapper,
} from "../components/StyledComponents";
import MarkdownPreview from "../components/MarkdownPreview";
import styled from "styled-components";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
`;

const TaleDetail = () => {
  const { taletitle } = useParams();
  const [tale, setTale] = useState(null);

  const navigate = useNavigate();

  const fetchTale = async () => {
    const response = await fetch(`${config.apiUrl}/tales/${taletitle}`);
    const data = await response.json();

    setTale(data);
  };

  useEffect(() => {
    fetchTale();
    // eslint-disable-next-line
  }, [taletitle]);

  if (!tale) {
    return <div>Loading....</div>;
  }

  const handleDelete = async (taleid) => {
    const response = await fetch(`${config.apiUrl}/tale/${taleid}/delete`, {
      method: "POST",
    });

    const data = await response.json();
    if (response.ok) {
      navigate("/tales");
    } else {
      console.error(data.error);
    }
  };

  const handleUpdate = async (taleid) => {
    navigate(`/tales/${taleid}/update`);
  };

  return (
    <div className="tale-detail">
      <picture>
        {tale.banner_url.map((banner, index) => (
          <source key={index} srcSet={banner} />
        ))}
        <img
          src={`${
            tale.banner_url.find((banner) => banner.includes(".webp")) ||
            tale.banner_url[0]
          }`}
          alt={`${tale.title} banner`}
          width="400"
          height="400"
        />
      </picture>
      <Wrapper>
        <h1>Title: </h1>
        <h1>{tale.title}</h1>
      </Wrapper>

      <Wrapper>
        <h2>Author: </h2>
        <h2>
          <Link to={`/authors/${tale.author.slug}`}>{tale.author.name}</Link>
        </h2>
      </Wrapper>

      <Wrapper>
        <h2>Genres: </h2>
        {tale.genre.map((genre) => (
          <div key={genre._id} style={{ display: "inline-block" }}>
            <h2>
              <Link to={`/genres/${genre.slug}`}>{genre.name}</Link>{" "}
            </h2>
          </div>
        ))}
      </Wrapper>

      <ContentWrapper>
        <h2>Content: </h2>
        <MarkdownPreview markdown={tale.content} />
      </ContentWrapper>

      <ButtonWrapper>
        <DeleteBtn onClick={() => handleDelete(tale._id)}>Delete</DeleteBtn>

        <UpdateBtn onClick={() => handleUpdate(tale._id)}>Update</UpdateBtn>
      </ButtonWrapper>
    </div>
  );
};

export default TaleDetail;
