"use client";

import React from "react";
import styled from "styled-components";
import { Card } from "antd";

const TrapezoidShape = styled.div`
  border-bottom: 100px solid gray;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  height: 0;
  width: 100px;
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

  &:hover ${TrapezoidShape} {
    border-bottom: 100px solid white;
  }
`;

const Trapezoid = () => {
  return (
    <StyledCard>
      <TrapezoidShape></TrapezoidShape>
    </StyledCard>
  );
};

export default Trapezoid;
