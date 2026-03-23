import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EntriesPage from "./pages/EntriesPage";
import NewEntryPage from "./pages/NewEntryPage";
import Footer from "./components/Footer";

import loadingBg from "./assets/malik-loading-screen.png";
import seedEntries, { type Entry } from "./data/entries";

const systemLines = [
  "Initializing DevLog",
  "Loading operator profile",
  "Syncing project archive",
  "System ready",
];

function LoadingScreen({ fading }: { fading: boolean }) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLineIndex((prev) => (prev + 1) % systemLines.length);
    }, 1100);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={`loadingScreen ${fading ? "loadingScreenFade" : ""}`}
      style={{ backgroundImage: `url(${loadingBg})` }}
    >
      <div className="loadingOverlay" />

      <div className="loadingContent">
        <h1 className="loadingName">MALIK ROGERS</h1>
        <p className="loadingRole">USAF Veteran // Developer // Otaku</p>

        <div className="loadingStatusWrap">
          <span className="loadingStatusLabel">STATUS</span>
          <p key={lineIndex} className="loadingStatusText">
            {systemLines[lineIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [fading, setFading] = useState(false);
  const [entries, setEntries] = useState<Entry[]>(seedEntries);

  useEffect(() => {
    const totalMs = 6700;
    const fadeMs = 700;

    const fadeTimer = window.setTimeout(() => {
      setFading(true);
    }, totalMs - fadeMs);

    const doneTimer = window.setTimeout(() => {
      setShowLoading(false);
    }, totalMs);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  function handleAddEntry(title: string, content: string) {
    const newEntry: Entry = {
      id: Date.now(),
      title: title.trim(),
      date: new Date().toLocaleDateString(),
      summary: content.trim(),
      tags: ["new"],
    };

    setEntries((prevEntries) => [...prevEntries, newEntry]);
  }

  if (showLoading) {
    return <LoadingScreen fading={fading} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home entries={entries} />} />
        <Route path="/entries" element={<EntriesPage entries={entries} />} />
        <Route
          path="/entries/new"
          element={<NewEntryPage onAddEntry={handleAddEntry} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home entries={entries} />} />
      </Routes>
      <Footer />
    </>
  );
}