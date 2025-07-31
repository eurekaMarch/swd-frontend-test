"use client";

import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem("i18nextLng", value);
  };

  const options =
    currentLang === "th"
      ? [
          { value: "th", label: "ไทย" },
          { value: "en", label: "อังกฤษ" },
        ]
      : [
          { value: "en", label: "EN" },
          { value: "th", label: "TH" },
        ];

  return (
    <Wrapper>
      <Select
        value={currentLang}
        onChange={handleChange}
        dropdownMatchSelectWidth={false}
        style={{ minWidth: "auto" }}
        options={options}
      />
    </Wrapper>
  );
};

export default LanguageSwitcher;
