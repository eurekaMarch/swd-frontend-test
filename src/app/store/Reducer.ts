"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormEntry {
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

interface FormState {
  formData: FormEntry[];
  selecteID: number[];
  dataById: FormEntry | null;
}

const initialState: FormState = {
  formData: [],
  selecteID: [],
  dataById: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveForm: (state, action: PayloadAction<Omit<FormEntry, "id">>) => {
      const getData = JSON.parse(localStorage.getItem("formData") || "[]");

      const lastId =
        getData.length > 0 ? getData[getData.length - 1].id || 0 : 0;

      const nextId = lastId + 1;

      const addID = { ...action.payload, id: nextId };

      const updateData = [...getData, addID];

      localStorage.setItem("formData", JSON.stringify(updateData));
      state.formData = updateData;
    },

    getData: (state) => {
      const data = JSON.parse(localStorage.getItem("formData") || "[]");
      state.formData = data;
    },

    deleteOne: (state, action: PayloadAction<number>) => {
      const getData = JSON.parse(localStorage.getItem("formData") || "[]");
      const updated = getData.filter(
        (item: FormEntry) => item.id !== action.payload
      );
      localStorage.setItem("formData", JSON.stringify(updated));
      state.formData = updated;
    },

    deleteMore: (state, action: PayloadAction<number[]>) => {
      const getData = JSON.parse(localStorage.getItem("formData") || "[]");
      const updated = getData.filter(
        (item: FormEntry) => !action.payload.includes(item.id)
      );
      localStorage.setItem("formData", JSON.stringify(updated));
      state.formData = updated;
    },

    setSelectedRowIds: (state, action: PayloadAction<number[]>) => {
      state.selecteID = action.payload;
    },

    getDataById: (state, action: PayloadAction<number>) => {
      const data = JSON.parse(localStorage.getItem("formData") || "[]");
      const found = data.find((item: FormEntry) => item.id === action.payload);
      state.dataById = found || null;
    },

    updateForm: (state, action: PayloadAction<FormEntry>) => {
      const getData = JSON.parse(localStorage.getItem("formData") || "[]");

      const index = getData.findIndex(
        (item: FormEntry) => item.id === action.payload.id
      );

      if (index !== -1) {
        getData[index] = action.payload;
        localStorage.setItem("formData", JSON.stringify(getData));
        state.formData = getData;
      }
    },
  },
});

export const {
  saveForm,
  getData,
  deleteOne,
  deleteMore,
  setSelectedRowIds,
  getDataById,
  updateForm,
} = formSlice.actions;
export default formSlice.reducer;
