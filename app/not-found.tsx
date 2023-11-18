"use client"

import Link from "next/link";
import { Button } from "primereact/button";

export default function NotFound() {
  return (
    <>
      <div className="container">
        <span>Você está tentando acessar uma página que não existe</span>
        <Link href="/">
          <Button>
          Dashboard
          </Button>
        </Link>
      </div>
    </>
  );
}
