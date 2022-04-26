import React from "react";

export default function Header({ title }: { title: string }) {
  return (
    <div>
      <h1>{title ? title : "Title Not Found"}</h1>
    </div>
  );
}
