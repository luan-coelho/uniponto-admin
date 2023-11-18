import { Metadata } from "next";
import AppConfig from "../../layout/AppConfig";
import React from "react";

export const metadata: Metadata = {
  title: "UniPonto",
  description: "Gerência de aplicação de ponto",
};

export default function SimpleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AppConfig simple />
    </>
  );
}
