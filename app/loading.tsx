"use client";

import PacmanLoader from "react-spinners/PacmanLoader";

export default function Loading() {
  return (
    <div className="fixed-element">
      <PacmanLoader color="#3A71EC" />
    </div>
  );
}
