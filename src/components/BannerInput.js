import styled from "styled-components";

const BannerField = styled.input`
  padding: 1rem;
  font-family: inherit;
  border: 1px solid #fff;
  border-radius: 8px;
  font-size: 1rem;
  width: 90%;

  :focus {
    border: 1px solid hsl(175, 98%, 24%);
    outline: none;
  }
`;

const BannerInput = ({ bannerUrl, handleBanner, index }) => {
  return (
    <BannerField
      type="text"
      name="bannerUrl"
      id="bannerUrl"
      onChange={(e) => handleBanner(e, index)}
      required
      value={bannerUrl || ''}
    />
  );
};

export default BannerInput;
