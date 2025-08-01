"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "./i18n";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import styled from "styled-components";
import { Card, Flex, Typography } from "antd";

const StyledFlex = styled(Flex)`
  height: 100vh;
`;

const StyledCard = styled(Card)`
  width: 300px;
  cursor: pointer;
`;
const StyledTypography = styled(Typography)`
  margin-top: 2rem;
`;

const Container = styled.div`
  margin: 2rem 1rem;
`;

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const { Text } = Typography;

  return (
    <Container>
      <LanguageSwitcher />

      <StyledFlex vertical justify="center" align="center">
        <Flex gap={24}>
          <StyledCard onClick={() => router.push("/test1")}>
            <Text strong>{t("titleHome")} 1</Text>
            <StyledTypography>{t("detailHome1")}</StyledTypography>
          </StyledCard>

          <StyledCard onClick={() => router.push("/test2")}>
            <Text strong>{t("titleHome")} 2</Text>
            <StyledTypography>{t("detailHome2")}</StyledTypography>
          </StyledCard>
        </Flex>
      </StyledFlex>
    </Container>
  );
}
