import styled from "styled-components";

const ErrorText = styled.p`
  color: red;
  font-size: 16px;
`;

const Index = ({ error }) => {
  return (
    error ? (
      <ErrorText>{error.message || 'An error occurred'}</ErrorText>
    ) : null
  );
};

export default Index;