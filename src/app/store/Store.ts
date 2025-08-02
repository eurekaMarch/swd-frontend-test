"use client";

import { configureStore } from "@reduxjs/toolkit";
import formSlice from "@/app/store/Reducer";

const store = configureStore({
  reducer: {
    form: formSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
