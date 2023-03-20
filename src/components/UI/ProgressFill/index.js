import styled from "styled-components";

const BarWrapper = styled.div`
  width: 400px;
  height: 20px;
  background-color: #f2f2f2;
  border-radius: 4px;
  overflow: hidden;
`;

const BarFill = styled.div`
  width: ${(props) => props.progress}%;
  height: 100%;
  background-color: dodgerblue;
  transition: width 0.3s ease-in-out;
`;

const ProgressFill = ({ progress }) => {
  return (
    <BarWrapper>
      <BarFill progress={progress}></BarFill>
    </BarWrapper>
  );
};

export default ProgressFill;