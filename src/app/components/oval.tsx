"use client";

import React from "react";
import styled from "styled-components";
import { Card } from "antd";

const OvalShape = styled.div`
  width: 200px;
  height: 100px;
  background: gray;
  border-radius: 100px / 50px;
`;

const StyledCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  cursor: pointer;
  transition: background-color 0.1s;
  border: none;

  &:hover {
    background-color: #ffa200;
  }

  &:active {
    background-color: #6eda78;
  }

  &:hover ${OvalShape} {
    background-color: white;
  }
`;

const Oval = () => {
  return (
    <StyledCard>
      <OvalShape></OvalShape>
    </StyledCard>
  );
};

export default Oval;
