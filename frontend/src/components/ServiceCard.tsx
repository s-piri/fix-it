import React from "react";

type Props = { icon?: string; title: string; onClick?: () => void };

export function ServiceCard({ icon = "🛠️", title, onClick }: Props) {
  return (
    <button onClick={onClick} className="card" style={{ textAlign: "left", background: "#F9FAFB" }}>
      <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontWeight: 600 }}>{title}</div>
    </button>
  );
}
