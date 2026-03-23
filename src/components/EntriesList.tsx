import { useEffect, useMemo, useState } from "react";
import EntryCard from "./EntryCard";
import { type Entry } from "../data/entries";

interface EntriesListProps {
  entries: Entry[];
  maxVisibleEntries?: number;
  itemsPerPage?: number;
}

export default function EntriesList({
  entries,
  maxVisibleEntries,
  itemsPerPage = 3,
}: EntriesListProps) {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "previous">("next");

  const newestFirstEntries = useMemo(() => {
    return [...entries].reverse();
  }, [entries]);

  const visibleSourceEntries = useMemo(() => {
    if (!maxVisibleEntries) {
      return newestFirstEntries;
    }

    return newestFirstEntries.slice(0, maxVisibleEntries);
  }, [newestFirstEntries, maxVisibleEntries]);

  const filteredEntries = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return visibleSourceEntries;
    }

    return visibleSourceEntries.filter((entry) => {
      const titleMatch = entry.title.toLowerCase().includes(searchValue);
      const summaryMatch = entry.summary.toLowerCase().includes(searchValue);
      const tagsMatch = entry.tags.some((tag) =>
        tag.toLowerCase().includes(searchValue)
      );

      return titleMatch || summaryMatch || tagsMatch;
    });
  }, [search, visibleSourceEntries]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEntries.length / itemsPerPage)
  );

  useEffect(() => {
    setPage(0);
  }, [search, entries, maxVisibleEntries, itemsPerPage]);

  const startIndex = page * itemsPerPage;
  const pageEntries = filteredEntries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  function changePage(nextPage: number, moveDirection: "next" | "previous") {
    if (nextPage < 0 || nextPage > totalPages - 1 || nextPage === page) {
      return;
    }

    setDirection(moveDirection);
    setIsAnimating(true);

    window.setTimeout(() => {
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

  const hasResults = pageEntries.length > 0;
  const shouldShowPager = filteredEntries.length > itemsPerPage;

  return (
    <section className="entriesSection">
      <div className="entriesTop">
        <input
          className="entriesSearch"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search logs or tags..."
        />

        <p className="pagerText">
          Showing {pageEntries.length} of {filteredEntries.length} matching
          entries
        </p>
      </div>

      <div
        className="entriesGrid"
        style={{
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating
            ? direction === "next"
              ? "translateX(-18px)"
              : "translateX(18px)"
            : "translateX(0)",
          transition: "opacity 0.18s ease, transform 0.18s ease",
        }}
      >
        {hasResults ? (
          pageEntries.map((entry) => <EntryCard key={entry.id} entry={entry} />)
        ) : (
          <div className="entriesEmpty">No log entries matched that search.</div>
        )}
      </div>

      {shouldShowPager && (
        <div className="entriesPager">
          <button
            className="pagerBtn"
            onClick={handlePrevious}
            disabled={page === 0}
          >
            ← Previous
          </button>

          <p className="pagerText">
            Page {page + 1} of {totalPages}
          </p>

          <button
            className="pagerBtn"
            onClick={handleNext}
            disabled={page === totalPages - 1}
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
}