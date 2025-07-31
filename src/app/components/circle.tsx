"use client";

import React from "react";
import styled from "styled-components";
import { Card } from "antd";

const CircleShape = styled.div`
  width: 100px;
  height: 100px;
  background: gray;
  border-radius: 50%;
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

  &:hover ${CircleShape} {
    background-color: white;
  }
`;

const Circle = () => {
  return (
    <StyledCard>
      <CircleShape></CircleShape>
    </StyledCard>
  );
};

export default Circle;
