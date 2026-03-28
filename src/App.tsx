import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EntriesPage from "./pages/EntriesPage";
import NewEntryPage from "./pages/NewEntryPage";
import EditEntryPage from "./pages/EditEntryPage";
import Footer from "./components/Footer";

import loadingBg from "./assets/malik-loading-screen.png";
import { type Entry } from "./data/entries";

const API_BASE_URL = "http://localhost:3000";

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
  const [entries, setEntries] = useState<Entry[]>([]);

  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [isSavingEntry, setIsSavingEntry] = useState(false);
  const [deletingEntryId, setDeletingEntryId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    if (!successMessage && !errorMessage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [successMessage, errorMessage]);

  async function fetchEntries() {
    try {
      setIsLoadingEntries(true);
      setErrorMessage("");

      const response = await fetch(`${API_BASE_URL}/entries`);

      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }

      const data = await response.json();
      setEntries(data.entries ?? []);
    } catch (error) {
      console.error("Failed to fetch entries:", error);
      setErrorMessage("Failed to load entries.");
    } finally {
      setIsLoadingEntries(false);
    }
  }

  async function handleAddEntry(
    title: string,
    content: string,
    mood: string,
    tags: string[]
  ) {
    try {
      setIsSavingEntry(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(`${API_BASE_URL}/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          summary: content,
          mood,
          tags,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create entry");
      }

      await fetchEntries();
      setSuccessMessage("Entry saved.");
    } catch (error) {
      console.error("Failed to add entry:", error);
      setErrorMessage("Failed to save entry.");
      throw error;
    } finally {
      setIsSavingEntry(false);
    }
  }

  async function handleEditEntry(
    id: number,
    title: string,
    content: string,
    mood: string,
    tags: string[]
  ) {
    try {
      setIsSavingEntry(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(`${API_BASE_URL}/entries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          summary: content,
          mood,
          tags,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update entry");
      }

      await fetchEntries();
      setSuccessMessage("Entry updated.");
    } catch (error) {
      console.error("Failed to edit entry:", error);
      setErrorMessage("Failed to update entry.");
      throw error;
    } finally {
      setIsSavingEntry(false);
    }
  }

  async function handleDeleteEntry(id: number) {
    try {
      setDeletingEntryId(id);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(`${API_BASE_URL}/entries/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }

      await fetchEntries();
      setSuccessMessage("Entry deleted.");
    } catch (error) {
      console.error("Failed to delete entry:", error);
      setErrorMessage("Failed to delete entry.");
    } finally {
      setDeletingEntryId(null);
    }
  }

  if (showLoading) {
    return <LoadingScreen fading={fading} />;
  }

  return (
    <>
      {(successMessage || errorMessage) && (
        <div className={`flashMessage ${errorMessage ? "flashError" : "flashSuccess"}`}>
          {errorMessage || successMessage}
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              entries={entries}
              onDeleteEntry={handleDeleteEntry}
              isLoadingEntries={isLoadingEntries}
              deletingEntryId={deletingEntryId}
            />
          }
        />
        <Route
          path="/entries"
          element={
            <EntriesPage
              entries={entries}
              onDeleteEntry={handleDeleteEntry}
              isLoadingEntries={isLoadingEntries}
              deletingEntryId={deletingEntryId}
            />
          }
        />
        <Route
          path="/entries/new"
          element={
            <NewEntryPage
              onAddEntry={handleAddEntry}
              isSavingEntry={isSavingEntry}
            />
          }
        />
        <Route
          path="/entries/:id/edit"
          element={
            <EditEntryPage
              onEditEntry={handleEditEntry}
              isSavingEntry={isSavingEntry}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="*"
          element={
            <Home
              entries={entries}
              onDeleteEntry={handleDeleteEntry}
              isLoadingEntries={isLoadingEntries}
              deletingEntryId={deletingEntryId}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}