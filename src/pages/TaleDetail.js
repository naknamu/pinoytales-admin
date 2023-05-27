import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import { DeleteBtn, UpdateBtn, ButtonWrapper } from "../components/StyledComponents";
import MarkdownPreview from "../components/MarkdownPreview";
import styled from "styled-components";

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
  
    const fetchBlogPost = async () => {
      const response = await fetch(`${config.apiUrl}/tales/${taletitle}`);
      const data = await response.json();
  
      setTale(data);
    };
  
    useEffect(() => {
      fetchBlogPost();
      // eslint-disable-next-line
    }, [taletitle]);

    if (!tale) {
        return <div>Loading....</div>;
    }

    return ( 
        <div className="tale-detail">
            <img src={tale.banner_url} alt="banner" width={250} />
            <Wrapper>
                <h1>Title: </h1>
                <h1>{tale.title}</h1>
            </Wrapper>

            <Wrapper>
                <h2>Author: </h2>
                <h2><Link to={`/authors/${tale.author.slug}`}>{tale.author.name}</Link></h2>
            </Wrapper>
            
            <Wrapper>
                <h2>Genres: </h2>
                {tale.genre.map((genre) => (
                    <div key={genre._id} style={{ display: "inline-block" }}>
                    <h2><Link to={`/genres/${genre.slug}`}>{genre.name}</Link> </h2>
                    </div>
                ))}
            </Wrapper>

            <ContentWrapper>
                <h2>Content: </h2>
                <MarkdownPreview markdown={tale.content} />
            </ContentWrapper>


            <ButtonWrapper>
                <DeleteBtn>
                <Link to="/tales">Delete</Link>
                </DeleteBtn>

                <UpdateBtn>
                <Link to="/">Update</Link>
                </UpdateBtn>
            </ButtonWrapper>
        </div>
     );
}
 
export default TaleDetail;