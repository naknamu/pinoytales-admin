import { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { InputField, FormWrapper, SubmitBtn } from "../components/StyledComponents";

const GenreUpdateForm = () => {
  const { genreid } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchGenre = async () => {
      const response = await fetch(
        `${config.apiUrl}/genre/${genreid}/update`
      );
      const data = await response.json();

      console.log(data);
      setName(data.name);
    };

    fetchGenre();
  }, [genreid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateGenre = {
      name
    };

    const response = await fetch(
      `${config.apiUrl}/genre/${genreid}/update`,
      {
        method: "POST",
        body: JSON.stringify(updateGenre),
        headers: {
          "Content-Type": "application/json"
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      navigate(`/genres`);
    } else {
      console.error(data.error);
    }
  };

    return ( 
      <FormWrapper onSubmit={(e) => handleSubmit(e)}>
        <h1>Update a Genre</h1>
  
        <InputField>
          <label htmlFor="name">Genre Name:</label>
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
 
export default GenreUpdateForm;