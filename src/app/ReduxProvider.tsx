"use client";

import { Provider } from "react-redux";
import Store from "@/app/store/Store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={Store}>{children}</Provider>;
}
