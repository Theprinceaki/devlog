type Entry = {
  id: number;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

type EntryCardProps = {
  entry: Entry;
};

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <article
      style={{
        padding: 16,
        borderRadius: 16,
        border: "1px solid rgba(0, 245, 255, 0.12)",
        background:
          "linear-gradient(180deg, rgba(14,20,30,0.95), rgba(8,12,20,0.95))",
        boxShadow:
          "0 10px 24px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.03)",
        display: "grid",
        gap: 10
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap"
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: ".78rem",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "#00f5ff",
            opacity: 0.9
          }}
        >
          Log Entry
        </p>

        <p
          style={{
            margin: 0,
            fontSize: ".82rem",
            color: "rgba(255,255,255,0.58)"
          }}
        >
          {entry.date}
        </p>
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: "1.08rem",
          lineHeight: 1.35,
          fontWeight: 700,
          color: "#f5f7ff"
        }}
      >
        {entry.title}
      </h3>

      <p
        style={{
          margin: 0,
          fontSize: ".97rem",
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.78)"
        }}
      >
        {entry.summary}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 4
        }}
      >
        {entry.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid rgba(0, 245, 255, 0.16)",
              background: "rgba(0, 245, 255, 0.06)",
              color: "#9eefff",
              fontSize: ".78rem",
              letterSpacing: ".03em"
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}