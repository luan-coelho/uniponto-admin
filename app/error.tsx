"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <>
      <div>
        <span>{error.message}</span>
      </div>
    </>
  );
}