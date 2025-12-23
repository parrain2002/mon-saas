import "../styles/header.css";

export default function Header() {
  const name = localStorage.getItem("name");

  return (
    <header className="header">
      <div className="header-left">
        <span className="header-name">Bonjour, {name}</span>
      </div>

      <nav className="header-links">
        <a href="/dashboard">Dashboard</a>
        <a href="/projects">Projets</a>
        <a href="/team">Équipe</a>
        <a href="/profile">Profil</a>
      </nav>
    </header>
  );
}
