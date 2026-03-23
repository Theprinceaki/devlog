import React from "react";
import Header from "../components/Header";
import NewEntryForm from "../components/NewEntryForm";

interface NewEntryPageProps {
  onAddEntry: (title: string, content: string) => void;
}

export default function NewEntryPage({
  onAddEntry,
}: NewEntryPageProps): React.JSX.Element {
  return (
    <div className="App">
      <Header
        rightTitle="New Captain Log"
        rightItems={[
          { key: "STATUS", val: "Writing new entry" },
          { key: "MODE", val: "Entry Creation" },
          { key: "TARGET", val: "Mission Archive" },
        ]}
      />

      <main className="grid">
        <section className="feed">
          <div className="card">
            <NewEntryForm onAddEntry={onAddEntry} />
          </div>
        </section>
      </main>
    </div>
  );
}