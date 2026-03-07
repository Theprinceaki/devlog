import type { Entry } from "../data/entries";

type EntryCardProps = {
  entry: Entry;
};

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <article className="post card">
      <div className="postTop">
        <div>
          <h2 className="postTitle">{entry.title}</h2>
          <p className="postMeta">
            {entry.date} • {entry.tag}
          </p>
        </div>
        <span className="badge shipped">{entry.tag}</span>
      </div>

      <p className="postExcerpt">{entry.summary}</p>
    </article>
  );
}