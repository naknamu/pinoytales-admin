import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { InputField, FormWrapper, SubmitBtn } from "../components/StyledComponents";

const AuthorUpdateForm = () => {
  const { authorid } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchAuthor = async () => {
      const response = await fetch(
        `${config.apiUrl}/author/${authorid}/update`
      );
      const data = await response.json();

      console.log(data);
      setName(data.name);
    };

    fetchAuthor();
  }, [authorid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateAuthor = {
      name
    };

    const response = await fetch(
      `${config.apiUrl}/author/${authorid}/update`,
      {
        method: "POST",
        body: JSON.stringify(updateAuthor),
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      navigate(`/authors`);
    } else {
      console.error(data);
    }
  };

    return ( 
      <FormWrapper onSubmit={(e) => handleSubmit(e)}>
        <h1>Update a Author</h1>
  
        <InputField>
          <label htmlFor="name">Author Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputField>
  
        <SubmitBtn type="submit">Submit</SubmitBtn>
      </FormWrapper>

    );
}
 
export default AuthorUpdateForm;