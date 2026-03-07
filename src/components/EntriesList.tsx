import EntryCard from "./EntryCard";
import { entries } from "../data/entries";

export default function EntriesList() {
  return (
    <section style={{ marginTop: 14, display: "grid", gap: 12 }}>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </section>
  );
}