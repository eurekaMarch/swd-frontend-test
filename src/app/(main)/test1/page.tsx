"use client";

import React, { useState } from "react";
import { Space, Typography, Card } from "antd";
import styled from "styled-components";
import "../../i18n";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import Circle from "@/app/components/circle";
import Oval from "@/app/components/oval";
import Trapezoid from "@/app/components/trapezoid";
import Parallelogram from "@/app/components/parallelogram";
import Square from "@/app/components/square ";
import Rectangle from "@/app/components/rectangle";

const { Text } = Typography;
const { Title } = Typography;

const Container = styled.div`
  margin: 2rem 1rem;
  text-align: center;
`;

const StyledTitle = styled(Title)`
  text-align: start;
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
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
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
`;

const Left = styled.div`
  width: 0;
  height: 0;
  border-top: 30px solid transparent;
  border-right: 60px solid gray;
  border-bottom: 30px solid transparent;
`;

const Right = styled.div`
  width: 0;
  height: 0;
  border-top: 30px solid transparent;
  border-left: 60px solid gray;
  border-bottom: 30px solid transparent;
`;
const Up = styled.div`
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 60px solid gray;
`;
const Down = styled.div`
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-top: 60px solid gray;
`;

const Label = styled.div`
  top: 88%;
  position: absolute;
  border-radius: 10px;
  padding: 0 10px;
  background-color: #6eda78;
`;

function Test1() {
  const [items, setItems] = useState<string[]>(["1", "2", "3"]);
  const { t } = useTranslation();

  const moveLeft = () => {
    const newItems = [...items];
    const first = newItems.shift(); // ลบตัวแรก
    if (first !== undefined) {
      newItems.push(first); // เอาไปใส่ท้าย
    }
    setItems(newItems);
  };

  const moveRight = () => {
    const newItems = [...items];
    const last = newItems.pop(); // ลบตัวท้าย
    if (last !== undefined) {
      newItems.unshift(last); // เอาไปใส่ข้างหน้า
    }
    setItems(newItems);
  };

  const moveUpDown = () => {
    // const newItems = [...items];
    // const last = newItems.pop(); // ลบตัวท้าย
    // if (last !== undefined) {
    //   newItems.unshift(last); // เอาไปใส่ข้างหน้า
    // }
    // setItems(newItems);
  };

  return (
    <Container>
      <LanguageSwitcher />

      <StyledTitle>{t("detailHome1")}</StyledTitle>

      <Space style={{ marginBottom: 50 }}>
        <StyledCard onClick={moveLeft}>
          <Left></Left>
          <Label>{t("leftRight")}</Label>
        </StyledCard>

        <StyledCard onClick={moveUpDown}>
          <StyledDiv>
            <Up></Up>
            <Down></Down>
            <Label>{t("upDown")}</Label>
          </StyledDiv>
        </StyledCard>

        <StyledCard onClick={moveRight}>
          <Right></Right>
          <Label>{t("leftRight")}</Label>
        </StyledCard>
      </Space>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Circle />

        <Oval />

        <Trapezoid />

        <Parallelogram />

        <Square />

        <Rectangle />
      </div>

      <div style={{ marginTop: 24 }}>
        {items.map((item, index) => (
          <Text key={index} style={{ margin: "0 12px", fontSize: 24 }}>
            {item}
          </Text>
        ))}
      </div>
    </Container>
  );
}

export default Test1;
