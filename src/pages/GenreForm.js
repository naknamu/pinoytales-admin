import { useState } from "react";
import config from "../config";
import { useNavigate } from "react-router";
import { InputField, FormWrapper, SubmitBtn } from "../components/StyledComponents";

const GenreForm = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newGenre = {
          name,
        };
    
        const response = await fetch(`${config.apiUrl}/genre/create`, {
          method: "POST",
          body: JSON.stringify(newGenre),
          headers: {
            "Content-Type": "application/json"
          },
        });
    
        const data = await response.json();
    
        if (response.ok) {
          navigate("/genres");
        } else {
          console.error(data.error);
        }
    };

    return ( 
      <FormWrapper onSubmit={(e) => handleSubmit(e)}>
        <h1>Create a Genre</h1>
  
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
 
export default GenreForm;