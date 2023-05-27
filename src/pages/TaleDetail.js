import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import { DeleteBtn, UpdateBtn, ButtonWrapper } from "../components/StyledComponents";
import MarkdownPreview from "../components/MdPreview";

const TaleDetail = () => {

    const { taletitle } = useParams();
    const [tale, setTale] = useState(null);
  
    const fetchBlogPost = async () => {
      const response = await fetch(`${config.apiUrl}/tales/${taletitle}`);
      const data = await response.json();

      console.log(data);
  
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
            <h1>Title: {tale.title}</h1>

            <h2>Author: 
                <a href="/">{tale.author.name}</a>
            </h2>

            <b>Genres: </b>
            {tale.genre.map((genre) => (
                <div key={genre._id} style={{ display: "inline-block" }}>
                <a href="/">{genre.name}</a> 
                </div>
            ))}
            <div>
                <h3>Content: </h3>
                <MarkdownPreview markdown={tale.content} />
            </div>

            <ButtonWrapper>
                <DeleteBtn>
                <Link to="/categories">Delete</Link>
                </DeleteBtn>

                <UpdateBtn>
                <Link to="/">Update</Link>
                </UpdateBtn>
            </ButtonWrapper>
        </div>
     );
}
 
export default TaleDetail;