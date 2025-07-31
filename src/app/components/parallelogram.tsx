"use client";

import React from "react";
import styled from "styled-components";
import { Card } from "antd";

const ParallelogramShape = styled.div`
  width: 150px;
  height: 100px;
  transform: skew(20deg);
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

  &:hover ${ParallelogramShape} {
    background-color: white;
  }
`;

const Parallelogram = () => {
  return (
    <StyledCard>
      <ParallelogramShape></ParallelogramShape>
    </StyledCard>
  );
};

export default Parallelogram;
