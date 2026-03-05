import React from "react";

export default function Footer(): React.JSX.Element {
  return (
    <div style={{ padding: "1.25rem 0", opacity: 0.75, textAlign: "center" }}>
      <small>© {new Date().getFullYear()} Malik Rogers — Devlog</small>
    </div>
  );
}