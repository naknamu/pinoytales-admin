import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import { DeleteBtn, UpdateBtn, ButtonWrapper } from "../components/StyledComponents";

const AuthorDetail = () => {
    const { authorname } = useParams();
    const [author, setAuthor] = useState(null);
    const [tales, setTales] = useState(null);

    useEffect(() => {
        const fetchAuthor = async () => {
          const response = await fetch(`${config.apiUrl}/authors/${authorname}`);
          const data = await response.json();
    
          setAuthor(data.author);
          setTales(data.tale_list);
        };
        fetchAuthor();
    }, [authorname]);

    const handleDelete = async (authorname) => {
        console.log("Delete author:" + authorname);
    };

    if (!author && !tales) {
        return <div>Loading....</div>;
    }

    return ( 
        <div className="author-detail">
        <h1>Author: {author.name}</h1>

        <h2>Tales under this author:</h2>
        {!tales.length && <h3 style={{color: "#AA4A44"}}>None</h3>}
        {tales.map((tale) => (
          <li key={tale._id}>
            <Link to={`/tales/${tale.slug}`}>{tale.title}</Link>
          </li>
        ))}
  
        <ButtonWrapper>
          <DeleteBtn onClick={() => handleDelete(author._id)}>
            <Link to="/authors">Delete</Link>
          </DeleteBtn>
  
          <UpdateBtn>
            <Link to={`/author/${author._id}/update`}>Update</Link>
          </UpdateBtn>
        </ButtonWrapper>
      </div>
     );
}
 
export default AuthorDetail;