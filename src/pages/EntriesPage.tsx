import React from "react";
import Header from "../components/Header";
import EntriesList from "../components/EntriesList";
import { type Entry } from "../data/entries";

interface EntriesPageProps {
  entries: Entry[];
}

export default function EntriesPage({
  entries,
}: EntriesPageProps): React.JSX.Element {
  return (
    <div className="App">
      <Header
        rightTitle="Log Archive"
        rightItems={[
          { key: "STATUS", val: "Reviewing all captain logs" },
          { key: "COUNT", val: String(entries.length) },
          { key: "MODE", val: "Archive View" },
        ]}
      />

      <main className="grid">
        <section className="feed">
          <EntriesList entries={entries} />
        </section>
      </main>
    </div>
  );
}