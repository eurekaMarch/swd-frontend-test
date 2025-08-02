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
import dayjs from "dayjs";
import type { SelectProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import styled from "styled-components";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  saveForm,
  getData,
  deleteOne,
  deleteMore,
  setSelectedRowIds,
  getDataById,
  updateForm,
} from "@/app/store/Reducer";
import { RootState } from "@/app/store/Store";

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

interface Person {
  id: number;
  prefix: string;
  firstName: string;
  lastName: string;
  birthday: string;
  nationality: string;
  citizenID1: string;
  citizenID2: string;
  citizenID3: string;
  citizenID4: string;
  citizenID5: string;
  gender: string;
  countryCode: string;
  phoneNumber: string;
  passport: string;
  salary: string;
}

function Test2() {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState(t("message"));
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState<boolean>(false);
  const PAGE_SIZE = 3;
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  const selectedRowIds = useSelector(
    (state: RootState) => state.form.selecteID
  );
  const dataById = useSelector((state: RootState) => state.form.dataById);

  const sortedData = [...formData].sort((a, b) => b.id - a.id);

  const convertData = sortedData.map((item) => ({
    ...item,
    gender:
      item.gender === "male"
        ? t("male")
        : item.gender === "female"
        ? t("female")
        : item.gender === "unisex"
        ? t("unisex")
        : item.gender,
    nationality:
      item.nationality === "thai"
        ? t("thai")
        : item.nationality === "french"
        ? t("french")
        : item.nationality === "usa"
        ? t("usa")
        : item.nationality,
  }));

  const paginatedData = convertData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleReset = () => {
    form.resetFields();
  };

  const handleDeleteOne = (id: number) => {
    dispatch(deleteOne(id));
    alert(t("messageDelete"));
    dispatch(getData());
  };

  const handleDeleteMore = () => {
    if (selectedRowIds.length === 0) {
      return;
    }

    dispatch(deleteMore(selectedRowIds));
    alert(t("messageDelete"));
    dispatch(getData());
  };

  const handleEdit = (id: number) => {
    dispatch(getDataById(id));
    setEditData(true);
  };

  const handleSubmit = (values: any) => {
    if (editData) {
      if (!dataById) return;

      const updateData = {
        id: dataById.id,
        prefix: values.prefix,
        firstName: values.firstName,
        lastName: values.lastName,
        birthday: values.birthday ? values.birthday.format("DD/MM/YYYY") : null,
        nationality: values.nationality,
        citizenID1: values.id1,
        citizenID2: values.id2,
        citizenID3: values.id3,
        citizenID4: values.id4,
        citizenID5: values.id5,
        gender: values.gender,
        countryCode: values.countryCode,
        phoneNumber: values.phoneNumber,
        passport: values.passport,
        salary: values.salary,
      };

      dispatch(updateForm(updateData));

      setEditData(false);

      alert(t("messageSave"));

      dispatch(getData());

      form.resetFields();
    } else {
      const saveData = {
        prefix: values.prefix,
        firstName: values.firstName,
        lastName: values.lastName,
        birthday: values.birthday ? values.birthday.format("DD/MM/YYYY") : null,
        nationality: values.nationality,
        citizenID1: values.id1,
        citizenID2: values.id2,
        citizenID3: values.id3,
        citizenID4: values.id4,
        citizenID5: values.id5,
        gender: values.gender,
        countryCode: values.countryCode,
        phoneNumber: values.phoneNumber,
        passport: values.passport,
        salary: values.salary,
      };

      dispatch(saveForm(saveData));

      alert(t("messageSave"));

      dispatch(getData());

      form.resetFields();
    }
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

  const selectAll = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    const allIds = checked ? formData.map((item) => item.id) : [];
    dispatch(setSelectedRowIds(allIds));
  };

  const columns: ColumnsType<Person> = [
    {
      title: (
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          checked={
            formData.length > 0 && selectedRowIds.length === formData.length
          }
          indeterminate={
            selectedRowIds.length > 0 && selectedRowIds.length < formData.length
          }
          onChange={(e) => {
            const checked = e.target.checked;
            const ids = checked ? formData.map((item) => item.id) : [];
            dispatch(setSelectedRowIds(ids));
          }}
        >
          {t("name")}
        </Checkbox>
      ),
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      render: (text, record) => (
        <Checkbox
          checked={selectedRowIds.includes(record.id)}
          onChange={(e) => {
            const checked = e.target.checked;

            const newSelected = checked
              ? [...selectedRowIds, record.id]
              : selectedRowIds.filter((id) => id !== record.id);

            dispatch(setSelectedRowIds(newSelected));
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
      key: "mobile",
      render: (text, record) => `${record.countryCode}${record.phoneNumber}`,
      sorter: (a, b) =>
        a.countryCode
          .replace("+", "")
          .localeCompare(b.countryCode.replace("+", "")),
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
            onClick={() => handleEdit(record.id)}
          >
            {t("edit")}
          </Button>
          <Button
            color="default"
            variant="link"
            onClick={() => handleDeleteOne(record.id)}
          >
            {t("delete")}
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    const handleLangChange = () => {
      setMessage(t("message"));
    };

    i18n.on("languageChanged", handleLangChange);

    return () => {
      i18n.off("languageChanged", handleLangChange);
    };
  }, [i18n, t]);

  useEffect(() => {
    if (dataById && editData) {
      form.setFieldsValue({
        prefix: dataById.prefix,
        firstName: dataById.firstName,
        lastName: dataById.lastName,
        birthday: dayjs(dataById.birthday, "DD/MM/YYYY"),
        nationality: dataById.nationality,
        id1: dataById.citizenID1,
        id2: dataById.citizenID2,
        id3: dataById.citizenID3,
        id4: dataById.citizenID4,
        id5: dataById.citizenID5,
        gender: dataById.gender,
        countryCode: dataById.countryCode,
        phoneNumber: dataById.phoneNumber,
        passport: dataById.passport,
        salary: dataById.salary,
      });
    }
  }, [dataById, form, editData]);

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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Text strong style={{ marginRight: 9, whiteSpace: "nowrap" }}>
                    <span style={{ color: "red" }}>*</span> {t("firstName")}:
                  </Text>
                  <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: message }]}
                    style={{ marginBottom: 0, width: "100%" }}
                  >
                    <Input style={{ flex: 1 }} />
                  </Form.Item>
                </div>
              </Col>

              <Col span={9}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Text strong style={{ marginRight: 9, whiteSpace: "nowrap" }}>
                    <span style={{ color: "red" }}>*</span>
                    {t("lastName")}:
                  </Text>
                  <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: message }]}
                    style={{ marginBottom: 0, width: "100%" }}
                  >
                    <Input style={{ flex: 1 }} />
                  </Form.Item>
                </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text strong style={{ marginRight: 9, whiteSpace: "nowrap" }}>
                    <span style={{ color: "red" }}>*</span>
                    {t("gender")}:
                  </Text>

                  <Form.Item
                    name="gender"
                    rules={[{ required: true, message: message }]}
                    style={{ marginBottom: 0 }}
                  >
                    <Radio.Group>
                      <Radio value="male">{t("male")}</Radio>
                      <Radio value="female">{t("female")}</Radio>
                      <Radio value="unisex">{t("unisex")}</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Text strong style={{ marginRight: 9, whiteSpace: "nowrap" }}>
                    {t("passport")}:
                  </Text>
                  <Form.Item
                    name="passport"
                    style={{ marginBottom: 0, width: "100%" }}
                    rules={[]}
                  >
                    <Input style={{ flex: 1 }} />
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <Row style={{ marginTop: 20 }} gutter={[16, 16]}>
              <Col span={8}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text strong style={{ marginRight: 9, whiteSpace: "nowrap" }}>
                    <span style={{ color: "red" }}>*</span>
                    {t("salary")}:
                  </Text>
                  <Form.Item
                    name="salary"
                    rules={[{ required: true, message: message }]}
                    style={{ marginBottom: 0 }}
                  >
                    <Input style={{ flex: 1 }} />
                  </Form.Item>
                </div>
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
            checked={
              formData.length > 0 && selectedRowIds.length === formData.length
            }
            onChange={selectAll}
          >
            {t("selectAll")}
          </Checkbox>

          <Button
            color="default"
            variant="text"
            disabled={paginatedData.length === 0}
            onClick={handleDeleteMore}
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
              total={formData.length}
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
