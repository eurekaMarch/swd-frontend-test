"use client";

import React from "react";
import styled from "styled-components";
import { Card } from "antd";

const RectangleShape = styled.div`
  width: 200px;
  height: 100px;
  background: gray;
`;

const StyledCard = styled(Card)`
  display: flex;
  justify-content: center;
  width: 250px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.1s;
  border: none;

  &:hover {
    background-color: #ffa200;
  }

  &:active {
    background-color: #6eda78;
  }

  &:hover ${RectangleShape} {
    background-color: white;
  }
`;

const Rectangle = () => {
  return (
    <StyledCard>
      <RectangleShape></RectangleShape>
    </StyledCard>
  );
};

export default Rectangle;
