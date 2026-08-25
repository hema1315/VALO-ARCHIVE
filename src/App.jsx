import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Agents from "./pages/agents/Agents";
import Maps from "./pages/maps/Maps";
import Weapons from "./pages/weapons/Weapons";
import AgentDetail from "./pages/agentDetail/AgentDetail";
import GameModes from "./pages/gameModes/Gamemodes";
import Tiers from "./pages/tiers/Tiers";
import Collections from "./pages/collections/Collections";
import About from "./pages/about/About";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agents/:agentId" element={<AgentDetail />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/weapons" element={<Weapons />} />
        <Route path="/gamemodes" element={<GameModes />} />
        <Route path="/tiers" element={<Tiers />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
