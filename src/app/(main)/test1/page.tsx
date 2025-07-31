"use client";

import React, { useState } from "react";
import { Space, Typography, Card, Row, Col } from "antd";
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
  const [swap, setSwap] = useState<boolean>(false);
  const [components, setComponents] = useState<JSX.Element[]>([
    <Circle key="1" />,
    <Oval key="2" />,
    <Trapezoid key="3" />,
    <Parallelogram key="4" />,
    <Square key="5" />,
    <Rectangle key="6" />,
  ]);
  const { t } = useTranslation();

  const moveLeft = () => {
    const newArray = [...components];
    const first = newArray.shift(); // ลบตัวแรก
    if (first !== undefined) {
      newArray.push(first); // เอาไปใส่ท้าย
    }
    setComponents(newArray);
  };

  const moveRight = () => {
    const newArray = [...components];
    const last = newArray.pop(); // ลบตัวท้าย
    if (last !== undefined) {
      newArray.unshift(last); // เอาไปใส่ข้างหน้า
    }
    setComponents(newArray);
  };

  const moveUpDown = () => {
    setSwap(!swap);
  };

  const random = () => {
    const newArray = [...components].sort(() => Math.random() - 0.5);
    setComponents(newArray);
  };

  return (
    <Container>
      <LanguageSwitcher />

      <StyledTitle>{t("detailHome1")}</StyledTitle>

      <Space style={{ marginBottom: 100 }}>
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

      {swap ? (
        <div>
          <Row justify="center" gutter={[16, 16]}>
            {components.slice(3, 6).map((item, index) => (
              <Col key={index} span={6} onClick={random}>
                {item}
              </Col>
            ))}
          </Row>

          <Row justify="end" gutter={[16, 16]} style={{ marginTop: 24 }}>
            {components.slice(0, 3).map((item, index) => (
              <Col key={index} span={6} onClick={random}>
                {item}
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div>
          <Row justify="end" gutter={[16, 16]}>
            {components.slice(0, 3).map((item, index) => (
              <Col key={index} span={6} onClick={random}>
                {item}
              </Col>
            ))}
          </Row>

          <Row justify="center" gutter={[16, 16]} style={{ marginTop: 24 }}>
            {components.slice(3, 6).map((item, index) => (
              <Col key={index} span={6} onClick={random}>
                {item}
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
}

export default Test1;
