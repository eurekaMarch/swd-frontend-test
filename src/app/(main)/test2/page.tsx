"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../i18n";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import {
  Typography,
  Row,
  Col,
  Button,
  Input,
  Select,
  DatePicker,
  Radio,
  Table,
  Checkbox,
  Pagination,
  Form,
} from "antd";
// import type { DatePickerProps } from "antd";
// import type { RadioChangeEvent } from "antd";
import type { SelectProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import styled from "styled-components";
import Image from "next/image";

const { Title } = Typography;
const { Text } = Typography;
const { Option } = Select;

const Container = styled.div`
  margin: 2rem 1rem;
  text-align: center;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const StyledTitle = styled(Title)`
  text-align: start;
`;

type Person = {
  id: string;
  name: string;
  gender: string;
  mobile: string;
  nationality: string;
};

const mockData: Person[] = [
  {
    id: "1",
    name: "John Smith",
    gender: "Male",
    mobile: "0812345678",
    nationality: "American",
  },
  {
    id: "2",
    name: "Suda Wong",
    gender: "Female",
    mobile: "0897654321",
    nationality: "Thai",
  },
  {
    id: "3",
    name: "Marie Dubois",
    gender: "Female",
    mobile: "0612349876",
    nationality: "French",
  },
  {
    id: "4",
    name: "James Lee",
    gender: "Male",
    mobile: "0843217890",
    nationality: "American",
  },
  {
    id: "5",
    name: "Napat Chai",
    gender: "Male",
    mobile: "0912345678",
    nationality: "Thai",
  },
  {
    id: "6",
    name: "Claire Bernard",
    gender: "Female",
    mobile: "0623456789",
    nationality: "French",
  },
  {
    id: "7",
    name: "Robert Brown",
    gender: "Male",
    mobile: "0887654321",
    nationality: "American",
  },
  {
    id: "8",
    name: "Nicha Sorn",
    gender: "Female",
    mobile: "0967890123",
    nationality: "Thai",
  },
  {
    id: "9",
    name: "Émile Laurent",
    gender: "Male",
    mobile: "0632109876",
    nationality: "French",
  },
  {
    id: "10",
    name: "Linda Carter",
    gender: "Female",
    mobile: "0954321765",
    nationality: "American",
  },
];

function Test2() {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState(t("message"));
  const router = useRouter();
  const [selectedRowIds, setSelectedRowIds] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;
  const [form] = Form.useForm();

  const paginatedData = mockData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleReset = () => {
    form.resetFields();
  };

  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      birthday: values.birthday ? values.birthday.format("DD/MM/YYYY") : null,
    };
    console.log(formattedValues);
  };

  const countryOptions: SelectProps["options"] = [
    {
      value: "+66",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Image
            src="https://flagcdn.com/w40/th.png"
            alt="TH"
            width={20}
            height={14}
            style={{ objectFit: "cover" }}
          />
          <span>+66</span>
        </div>
      ),
    },
    {
      value: "+33",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Image
            src="https://flagcdn.com/w40/fr.png"
            alt="TH"
            width={20}
            height={14}
            style={{ objectFit: "cover" }}
          />
          <span>+33</span>
        </div>
      ),
    },
    {
      value: "+1",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Image
            src="https://flagcdn.com/w40/us.png"
            alt="TH"
            width={20}
            height={14}
            style={{ objectFit: "cover" }}
          />
          <span>+1</span>
        </div>
      ),
    },
  ];

  // const onSelectChange = (newSelectedRowIds: React.Key[]) => {
  //   setSelectedRowIds(newSelectedRowIds);
  // };

  const selectAll = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    const allIds = checked ? mockData.map((item) => item.id) : [];
    setSelectedRowIds(allIds);
  };

  const columns: ColumnsType<Person> = [
    {
      title: (
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          checked={selectedRowIds.length === mockData.length}
          indeterminate={
            selectedRowIds.length > 0 && selectedRowIds.length < mockData.length
          }
          onChange={(e) => {
            const checked = e.target.checked;
            const ids = checked ? mockData.map((item) => item.id) : [];
            setSelectedRowIds(ids);
          }}
        >
          {t("name")}
        </Checkbox>
      ),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <Checkbox
          checked={selectedRowIds.includes(record.id)}
          onChange={(e) => {
            const checked = e.target.checked;
            setSelectedRowIds((prev) =>
              checked
                ? [...prev, record.id]
                : prev.filter((id) => id !== record.id)
            );
          }}
        >
          {text}
        </Checkbox>
      ),
    },
    {
      title: <>{t("gender")}</>,
      dataIndex: "gender",
      key: "gender",
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: <>{t("mobile")}</>,
      dataIndex: "mobile",
      key: "mobile",
      sorter: (a, b) =>
        a.mobile.slice(0, 3).localeCompare(b.mobile.slice(0, 3)),
    },
    {
      title: <>{t("nation")}</>,
      dataIndex: "nationality",
      key: "nationality",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: <>{t("manage")}</>,
      key: "manage",
      render: (text, record) => (
        <div>
          <Button
            color="default"
            variant="link"
            onClick={() => console.log(record.id)}
          >
            Edit
          </Button>
          <Button color="default" variant="link">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleLangChange = () => {
      setMessage(t("message"));
    };

    i18n.on("languageChanged", handleLangChange);

    return () => {
      i18n.off("languageChanged", handleLangChange);
    };
  }, [i18n, t]);

  return (
    <Container>
      <LanguageSwitcher />

      <Wrap>
        <Button
          color="default"
          variant="text"
          style={{
            backgroundColor: "white",
          }}
          onClick={() => router.push("/")}
        >
          {t("goHome")}
        </Button>
      </Wrap>

      <StyledTitle>{t("detailHome2")}</StyledTitle>

      <Form form={form} onFinish={handleSubmit}>
        <Row justify="center" style={{ marginTop: 24 }}>
          <Col span={18} style={{ border: "1px solid black", padding: "1rem" }}>
            <Row style={{ marginTop: 5 }} gutter={[16, 16]}>
              <Col span={6}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text strong style={{ marginRight: 8, whiteSpace: "nowrap" }}>
                    <span style={{ color: "red" }}>*</span>
                    {t("prefix")}:
                  </Text>
                  <Form.Item
                    name="prefix"
                    rules={[{ required: true, message: message }]}
                    style={{ marginBottom: 0, flex: 1 }}
                  >
                    <Select placeholder={t("prefix")}>
                      <Option value="mr">{t("prefixMr")}</Option>
                      <Option value="mrs">{t("prefixMrs")}</Option>
                      <Option value="miss">{t("prefixMiss")}</Option>
                    </Select>
                  </Form.Item>
                </div>
              </Col>

              <Col span={9}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: message }]}
                  style={{ marginBottom: 0 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Text
                      strong
                      style={{ marginRight: 9, whiteSpace: "nowrap" }}
                    >
                      <span style={{ color: "red" }}>*</span> {t("firstName")}:
                    </Text>
                    <Input style={{ flex: 1 }} />
                  </div>
                </Form.Item>
              </Col>

              <Col span={9}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: message }]}
                  style={{ marginBottom: 0 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Text
                      strong
                      style={{ marginRight: 9, whiteSpace: "nowrap" }}
                    >
                      <span style={{ color: "red" }}>*</span>
                      {t("lastName")}:
                    </Text>
                    <Input style={{ flex: 1 }} />
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }} gutter={[16, 16]}>
              <Col span={6}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text strong style={{ marginRight: 9, whiteSpace: "nowrap" }}>
                    <span style={{ color: "red" }}>*</span>
                    {t("birthday")}:
                  </Text>
                  <Form.Item
                    name="birthday"
                    rules={[{ required: true, message: message }]}
                    style={{ marginBottom: 0, flex: 1 }}
                  >
                    <DatePicker format="DD/MM/YYYY" placeholder={t("date")} />
                  </Form.Item>
                </div>
              </Col>

              <Col span={9}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text strong style={{ marginRight: 9, whiteSpace: "nowrap" }}>
                    <span style={{ color: "red" }}>*</span>
                    {t("nation")}:
                  </Text>
                  <Form.Item
                    name="nationality"
                    rules={[{ required: true, message: message }]}
                    style={{ marginBottom: 0, flex: 1 }}
                  >
                    <Select placeholder={`--${t("select")}--`}>
                      <Option value="thai">{t("thai")}</Option>
                      <Option value="french">{t("french")}</Option>
                      <Option value="usa">{t("usa")}</Option>
                    </Select>
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }} gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item shouldUpdate noStyle>
                  {({ getFieldError }) => {
                    const id1Error = getFieldError("id1")?.[0];
                    const id2Error = getFieldError("id2")?.[0];
                    const id3Error = getFieldError("id3")?.[0];
                    const id4Error = getFieldError("id4")?.[0];
                    const id5Error = getFieldError("id5")?.[0];

                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          width: "100%",
                          gap: "1rem",
                        }}
                      >
                        <Text
                          strong
                          style={{ whiteSpace: "nowrap", paddingTop: 4 }}
                        >
                          {t("id")}:
                        </Text>

                        <div style={{ width: "5%" }}>
                          <Form.Item
                            name="id1"
                            rules={[]}
                            validateStatus={id1Error ? "error" : ""}
                            help={id1Error}
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              maxLength={1}
                              pattern="[0-9]*"
                              style={{ textAlign: "center" }}
                            />
                          </Form.Item>
                        </div>

                        <span style={{ paddingTop: 5 }}>-</span>

                        <div style={{ width: "10%" }}>
                          <Form.Item
                            name="id2"
                            rules={[]}
                            validateStatus={id2Error ? "error" : ""}
                            help={id2Error}
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              maxLength={4}
                              pattern="[0-9]*"
                              style={{ textAlign: "center" }}
                            />
                          </Form.Item>
                        </div>

                        <span style={{ paddingTop: 5 }}>-</span>

                        <div style={{ width: "10%" }}>
                          <Form.Item
                            name="id3"
                            rules={[]}
                            validateStatus={id3Error ? "error" : ""}
                            help={id3Error}
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              maxLength={5}
                              pattern="[0-9]*"
                              style={{ textAlign: "center" }}
                            />
                          </Form.Item>
                        </div>

                        <span style={{ paddingTop: 5 }}>-</span>

                        <div style={{ width: "6%" }}>
                          <Form.Item
                            name="id4"
                            rules={[]}
                            validateStatus={id4Error ? "error" : ""}
                            help={id4Error}
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              maxLength={2}
                              pattern="[0-9]*"
                              style={{ textAlign: "center" }}
                            />
                          </Form.Item>
                        </div>

                        <span style={{ paddingTop: 5 }}>-</span>

                        <div style={{ width: "5%" }}>
                          <Form.Item
                            name="id5"
                            rules={[]}
                            validateStatus={id5Error ? "error" : ""}
                            help={id5Error}
                            style={{ marginBottom: 0 }}
                          >
                            <Input
                              maxLength={1}
                              pattern="[0-9]*"
                              style={{ textAlign: "center" }}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    );
                  }}
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }} gutter={[16, 16]}>
              <Col span={7}>
                <Form.Item
                  name="gender"
                  rules={[{ required: true, message: message }]}
                  style={{ marginBottom: 0 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Text
                      strong
                      style={{ marginRight: 9, whiteSpace: "nowrap" }}
                    >
                      <span style={{ color: "red" }}>*</span>
                      {t("gender")}:
                    </Text>

                    <Radio.Group>
                      <Radio value="male">{t("male")}</Radio>
                      <Radio value="female">{t("female")}</Radio>
                      <Radio value="unisex">{t("unisex")}</Radio>
                    </Radio.Group>
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }} gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item shouldUpdate noStyle>
                  {({ getFieldError }) => {
                    const countryCodeError = getFieldError("countryCode")?.[0];
                    const phoneNumberError = getFieldError("phoneNumber")?.[0];

                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          width: "100%",
                          gap: "1rem",
                        }}
                      >
                        <Text
                          strong
                          style={{ whiteSpace: "nowrap", paddingTop: 4 }}
                        >
                          <span style={{ color: "red" }}>*</span>
                          {t("mobile")}:
                        </Text>

                        <div style={{ width: "15%" }}>
                          <Form.Item
                            name="countryCode"
                            rules={[{ required: true, message }]}
                            validateStatus={countryCodeError ? "error" : ""}
                            help={countryCodeError}
                            style={{ marginBottom: 0 }}
                          >
                            <Select options={countryOptions} />
                          </Form.Item>
                        </div>

                        <span style={{ paddingTop: 5 }}>-</span>

                        <div style={{ width: "25%" }}>
                          <Form.Item
                            name="phoneNumber"
                            rules={[{ required: true, message }]}
                            validateStatus={phoneNumberError ? "error" : ""}
                            help={phoneNumberError}
                            style={{ marginBottom: 0 }}
                          >
                            <Input maxLength={10} />
                          </Form.Item>
                        </div>
                      </div>
                    );
                  }}
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }} gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  name="passport"
                  style={{ marginBottom: 0 }}
                  rules={[]}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Text
                      strong
                      style={{ marginRight: 9, whiteSpace: "nowrap" }}
                    >
                      {t("passport")}:
                    </Text>

                    <Input style={{ flex: 1 }} />
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }} gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  name="salary"
                  rules={[{ required: true, message: message }]}
                  style={{ marginBottom: 0 }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Text
                      strong
                      style={{ marginRight: 9, whiteSpace: "nowrap" }}
                    >
                      <span style={{ color: "red" }}>*</span>
                      {t("salary")}:
                    </Text>

                    <Input style={{ flex: 1 }} />
                  </div>
                </Form.Item>
              </Col>

              <Col span={4}></Col>

              <Col span={4}>
                <div>
                  <Button
                    onClick={handleReset}
                    htmlType="reset"
                    color="default"
                    variant="text"
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    {t("reset")}
                  </Button>
                </div>
              </Col>

              <Col span={4}>
                <div>
                  <Button
                    htmlType="submit"
                    color="default"
                    variant="text"
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    {t("submit")}
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      <div style={{ textAlign: "start", margin: "2rem 4rem" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={selectedRowIds.length === mockData.length}
            onChange={selectAll}
          >
            {t("selectAll")}
          </Checkbox>

          <Button
            color="default"
            variant="text"
            style={{
              backgroundColor: "white",
              marginLeft: "1rem",
            }}
          >
            {t("delete")}
          </Button>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <Wrap>
            <Pagination
              current={currentPage}
              total={mockData.length}
              pageSize={PAGE_SIZE}
              onChange={(page) => setCurrentPage(page)}
              style={{ marginBottom: 16, textAlign: "right" }}
              prevIcon={<span>{t("prev")}</span>}
              nextIcon={<span>{t("next")}</span>}
            />
          </Wrap>

          <Table
            columns={columns}
            dataSource={paginatedData}
            pagination={false}
            rowKey="id"
          />
        </div>
      </div>
    </Container>
  );
}

export default Test2;
