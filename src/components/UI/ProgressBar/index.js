import React from "react";
import styled from "styled-components";

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f2f2f2;
  border-radius: 4px;
`;

const ProgressBarInner = styled.div`
  height: 100%;
  border-radius: 4px;
  background-color: ${props => props.color || "#4caf50"};
  width: ${props => props.width || "0%"};
`;

const Index = ({ value, color }) => {
  return (
    <ProgressBarWrapper>
      <ProgressBarInner width={`${value}%`} color={color} />
    </ProgressBarWrapper>
  );
};

export default Index;