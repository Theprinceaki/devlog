import { useEffect, useMemo, useState } from "react";
import EntryCard from "./EntryCard";
import { entries } from "../data/entries";

export default function EntriesList() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "previous">("next");

  const reversedEntries = [...entries].reverse();

  const filteredEntries = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return reversedEntries;
    }

    return reversedEntries.filter((entry) => {
      const titleMatch = entry.title.toLowerCase().includes(searchValue);
      const summaryMatch = entry.summary.toLowerCase().includes(searchValue);
      const tagsMatch = entry.tags.some((tag) =>
        tag.toLowerCase().includes(searchValue)
      );

      return titleMatch || summaryMatch || tagsMatch;
    });
  }, [search, reversedEntries]);

  const entriesPerPage = 3;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEntries.length / entriesPerPage)
  );

  useEffect(() => {
    setPage(0);
  }, [search]);

  const startIndex = page * entriesPerPage;
  const visibleEntries = filteredEntries.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  function changePage(nextPage: number, moveDirection: "next" | "previous") {
    if (nextPage < 0 || nextPage > totalPages - 1 || nextPage === page) {
      return;
    }

    setDirection(moveDirection);
    setIsAnimating(true);

    setTimeout(() => {
      setPage(nextPage);
      setIsAnimating(false);
    }, 180);
  }

  function handleNext() {
    changePage(page + 1, "next");
  }

  function handlePrevious() {
    changePage(page - 1, "previous");
  }

  return (
    <section
      style={{
        marginTop: 20,
        padding: 20,
        borderRadius: 20,
        border: "1px solid rgba(0, 245, 255, 0.18)",
        background:
          "linear-gradient(180deg, rgba(8,12,20,0.96), rgba(4,8,14,0.98))",
        boxShadow:
          "0 18px 40px rgba(0,0,0,0.35), 0 0 18px rgba(0,245,255,0.08)",
        display: "grid",
        gap: 18
      }}
    >
      <div
        style={{
          display: "grid",
          gap: 10,
          paddingBottom: 14,
          borderBottom: "1px solid rgba(0, 245, 255, 0.12)"
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: ".78rem",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "#00f5ff",
            opacity: 0.9
          }}
        >
          DevLog Archive
        </p>

        <h2
          style={{
            margin: 0,
            fontSize: "1.4rem",
            fontWeight: 700,
            letterSpacing: ".03em",
            color: "#f5f7ff"
          }}
        >
          Recent Captain’s Log Entries
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: ".95rem",
            lineHeight: 1.5,
            color: "#00d9ff"
          }}
        >
          A running log of what I’m building, fixing, and learning as I grow
          Nexus V into a stronger full-stack system.
        </p>

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search logs or tags..."
          style={{
            marginTop: 6,
            width: "100%",
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid rgba(0, 245, 255, 0.18)",
            outline: "none",
            background: "rgba(10,16,24,0.95)",
            color: "#f5f7ff",
            fontSize: ".95rem",
            boxSizing: "border-box",
            boxShadow: "inset 0 0 10px rgba(0, 245, 255, 0.04)"
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gap: 14,
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating
            ? direction === "next"
              ? "translateX(-18px)"
              : "translateX(18px)"
            : "translateX(0)",
          transition: "opacity 0.18s ease, transform 0.18s ease"
        }}
      >
        {visibleEntries.length > 0 ? (
          visibleEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))
        ) : (
          <div
            style={{
              padding: 18,
              borderRadius: 16,
              border: "1px solid rgba(0, 245, 255, 0.12)",
              background:
                "linear-gradient(180deg, rgba(14,20,30,0.95), rgba(8,12,20,0.95))",
              color: "rgba(255,255,255,0.72)"
            }}
          >
            No log entries matched that search.
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginTop: 4
        }}
      >
        <button
          onClick={handlePrevious}
          disabled={page === 0 || filteredEntries.length === 0}
          style={{
            padding: "10px 16px",
            borderRadius: 12,
            border: "1px solid rgba(0, 245, 255, 0.18)",
            background:
              page === 0 || filteredEntries.length === 0
                ? "rgba(255,255,255,0.04)"
                : "linear-gradient(180deg, rgba(18,28,40,1), rgba(10,18,28,1))",
            color:
              page === 0 || filteredEntries.length === 0
                ? "rgba(255,255,255,0.4)"
                : "#eafcff",
            cursor:
              page === 0 || filteredEntries.length === 0
                ? "not-allowed"
                : "pointer",
            fontWeight: 600,
            letterSpacing: ".03em",
            boxShadow:
              page === 0 || filteredEntries.length === 0
                ? "none"
                : "0 0 12px rgba(0, 245, 255, 0.08)"
          }}
        >
          ← Previous
        </button>

        <p
          style={{
            margin: 0,
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid rgba(0, 245, 255, 0.18)",
            background: "rgba(0, 245, 255, 0.06)",
            color: "#c9fbff",
            fontSize: ".92rem",
            letterSpacing: ".06em",
            boxShadow:
              "0 0 12px rgba(0, 245, 255, 0.14), inset 0 0 10px rgba(0, 245, 255, 0.05)"
          }}
        >
          Page {filteredEntries.length === 0 ? 0 : page + 1} of{" "}
          {filteredEntries.length === 0 ? 0 : totalPages}
        </p>

        <button
          onClick={handleNext}
          disabled={page === totalPages - 1 || filteredEntries.length === 0}
          style={{
            padding: "10px 16px",
            borderRadius: 12,
            border: "1px solid rgba(0, 245, 255, 0.18)",
            background:
              page === totalPages - 1 || filteredEntries.length === 0
                ? "rgba(255,255,255,0.04)"
                : "linear-gradient(180deg, rgba(18,28,40,1), rgba(10,18,28,1))",
            color:
              page === totalPages - 1 || filteredEntries.length === 0
                ? "rgba(255,255,255,0.4)"
                : "#eafcff",
            cursor:
              page === totalPages - 1 || filteredEntries.length === 0
                ? "not-allowed"
                : "pointer",
            fontWeight: 600,
            letterSpacing: ".03em",
            boxShadow:
              page === totalPages - 1 || filteredEntries.length === 0
                ? "none"
                : "0 0 12px rgba(0, 245, 255, 0.08)"
          }}
        >
          Next →
        </button>
      </div>
    </section>
  );
}