import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import NewEntryForm from "../components/NewEntryForm";
import { type Entry } from "../data/entries";

const API_BASE_URL = "http://localhost:3000";

interface EditEntryPageProps {
  onEditEntry: (
    id: number,
    title: string,
    content: string,
    mood: string,
    tags: string[]
  ) => Promise<void> | void;
  isSavingEntry: boolean;
}

export default function EditEntryPage({
  onEditEntry,
  isSavingEntry,
}: EditEntryPageProps): React.JSX.Element {
  const { id } = useParams();
  const [entry, setEntry] = useState<Entry | null>(null);

  useEffect(() => {
    async function fetchEntry() {
      try {
        const response = await fetch(`${API_BASE_URL}/entries/${id}`);
        const data = await response.json();
        setEntry(data.entry ?? null);
      } catch (error) {
        console.error("Failed to fetch entry:", error);
      }
    }

    fetchEntry();
  }, [id]);

  async function handleSubmit(
    title: string,
    content: string,
    mood: string,
    tags: string[]
  ) {
    if (!id) {
      return;
    }

    await onEditEntry(Number(id), title, content, mood, tags);
  }

  return (
    <div className="App">
      <Header
        rightTitle="Edit Captain Log"
        rightItems={[
          { key: "STATUS", val: "Updating entry" },
          { key: "MODE", val: "Edit Mode" },
          { key: "TARGET", val: "Mission Archive" },
        ]}
      />

      <main className="grid">
        <section className="feed">
          <div className="card">
            {entry ? (
              <NewEntryForm
                onSubmitEntry={handleSubmit}
                initialTitle={entry.title}
                initialContent={entry.summary}
                initialMood={entry.mood}
                initialTags={entry.tags}
                submitLabel="Update Entry"
                isSubmitting={isSavingEntry}
              />
            ) : (
              <p>Loading entry...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}