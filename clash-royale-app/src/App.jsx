import { Routes, Route } from "react-router-dom";
import PlayerSearch from "./components/PlayerSearch";
import PlayerDetails from "./components/PlayerDetails";

export default function App() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container">
          <a href="/" className="navbar-brand">
            Clash Royale Stats
          </a>
        </div>
      </nav>

      <div style={{ paddingTop: "56px" }}>
        <Routes>
          <Route path="/" element={<PlayerSearch />} />
          <Route path="/player/:tag" element={<PlayerDetails />} />
        </Routes>
      </div>
    </>
  );
}
