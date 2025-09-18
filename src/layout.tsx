import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="layout">
      <header>Header Global</header>
      <main>{children}</main>
      <footer>© 2025 Globales</footer>
    </div>
  );
}
