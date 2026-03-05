import React, { useMemo, useState } from "react";
import Header from "./Header";

type Tag =
  | "All"
  | "Backend"
  | "Database"
  | "Routing"
  | "Publishing"
  | "Observability"
  | "DevOps"
  | "Testing"
  | "Demo";

type LogEntry = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  badge: Tag;
  tags: Tag[];
  excerpt: string;
  details: {
    whatWeBuilt?: string[];
    problemsSolved?: { problem: string; fix: string; whyItMattered: string }[];
    endpoints?: string[];
    demoNotes?: string[];
    screenshots?: string[];
  };
};

const TAGS: Tag[] = [
  "All",
  "Backend",
  "Database",
  "Routing",
  "Publishing",
  "Observability",
  "DevOps",
  "Testing",
  "Demo",
];

function includesLoose(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle.trim().toLowerCase());
}

function formatDate(d: string) {
  // Keep it simple and consistent
  return d;
}

export default function Home(): React.JSX.Element {
  // --- Data: Journey entries (from the devlog packet) ---
  const entries: LogEntry[] = useMemo(
    () => [
      {
        id: "dv-001",
        title: "Sprint 1 Kickoff — Backend Skeleton + Route Pattern",
        date: "2026-03-01",
        badge: "Backend",
        tags: ["Backend", "Routing"],
        excerpt:
          "Locked folder structure, route modules, app mounts, and a stable server entrypoint so we can iterate fast without breaking everything.",
        details: {
          whatWeBuilt: [
            "api/src/app.js (Express app + mounts)",
            "api/src/server.js (boot)",
            "api/src/routes/* (route module pattern)",
          ],
          demoNotes: [
            "Goal: predictable structure so every new feature is one new route module or one new handler — no spaghetti.",
          ],
        },
      },
      {
        id: "dv-002",
        title: "SQL Server Connection Battle — Windows Auth + Verified DB Health",
        date: "2026-03-02",
        badge: "Database",
        tags: ["Database", "Backend"],
        excerpt:
          "Hit connection failures and timeouts, then switched to Windows Auth + correct driver setup. Verified connection via /health/db returning DB_NAME().",
        details: {
          problemsSolved: [
            {
              problem:
                "Connection failures (instance confusion, timeouts, localhost:1433 not responding).",
              fix: "Aligned instance name, used Windows Auth, correct driver approach, verified with a DB query endpoint.",
              whyItMattered:
                "Until the DB connection is real and repeatable, everything else is fake progress.",
            },
            {
              problem: "ESM import error with msnodesqlv8 (ERR_MODULE_NOT_FOUND).",
              fix: "Used the correct import target / dynamic import pattern compatible with ESM.",
              whyItMattered:
                "One bad import kills the runtime. Fixing this stabilized startup.",
            },
          ],
          endpoints: ["GET /health", "GET /health/db", "GET /db/ping"],
          screenshots: [
            "Connected-to-DB confirmation in terminal",
            "/health/db returns DB_NAME()",
          ],
        },
      },
      {
        id: "dv-003",
        title: "Core JD Workflow — Create JD + Version 1 (Transaction)",
        date: "2026-03-03",
        badge: "Backend",
        tags: ["Backend", "Database"],
        excerpt:
          "Built the transactional create flow: insert job_descriptions, insert version_history v1, update current_version_id. Clean validation + predictable responses.",
        details: {
          whatWeBuilt: [
            "POST /job-descriptions (JD + version_history v1 transaction)",
            "DB pointer: job_descriptions.current_version_id",
            "Input validation + consistent error shapes",
          ],
          endpoints: [
            "POST /job-descriptions",
            "GET /job-descriptions",
            "GET /job-descriptions/:id",
          ],
          demoNotes: [
            "This is the backbone: everything else hangs off job_description_id + version_id.",
          ],
        },
      },
      {
        id: "dv-004",
        title: "Versioning v2+ — Timeline + Current Version Updates",
        date: "2026-03-03",
        badge: "Backend",
        tags: ["Backend", "Routing", "Testing"],
        excerpt:
          "Added version timeline and v2+ creation. Each new version increments version_number and flips current_version_id in a transaction.",
        details: {
          whatWeBuilt: [
            "GET /job-descriptions/:id/versions",
            "POST /job-descriptions/:id/versions (v2+)",
            "Rule: version_id must belong to the job_description_id",
          ],
          endpoints: [
            "GET /job-descriptions/:id/versions",
            "POST /job-descriptions/:id/versions",
          ],
          problemsSolved: [
            {
              problem: "Postman JSON parse errors (bad payload formatting).",
              fix: "Standardized: Body → raw → JSON, single object only, no duplicated braces.",
              whyItMattered:
                "Testing has to be reliable or you lose hours to noise.",
            },
          ],
        },
      },
      {
        id: "dv-005",
        title: "Feedback + Approvals — Workflow Starts Looking Real",
        date: "2026-03-04",
        badge: "Testing",
        tags: ["Backend", "Database", "Testing"],
        excerpt:
          "Implemented structured feedback tied to versions, and approvals tied to workflow stages. Approvals update JD status (approved/rejected/in_review).",
        details: {
          whatWeBuilt: [
            "POST/GET /job-descriptions/:id/feedback",
            "POST/GET /job-descriptions/:id/approvals",
            "JD status mapping: in_review → approved/rejected",
          ],
          endpoints: [
            "POST /job-descriptions/:id/feedback",
            "GET /job-descriptions/:id/feedback",
            "POST /job-descriptions/:id/approvals",
            "GET /job-descriptions/:id/approvals",
          ],
          demoNotes: [
            "This is the compliance vibe: human feedback + recorded approvals = traceability.",
          ],
        },
      },
      {
        id: "dv-006",
        title: "Publishing — Outputs + History + Status Published",
        date: "2026-03-04",
        badge: "Publishing",
        tags: ["Publishing", "Backend", "Database"],
        excerpt:
          "Added publishing table + routes to generate job posting and LinkedIn output. Enforced approved-before-publish and set JD status to published.",
        details: {
          whatWeBuilt: [
            "POST /job-descriptions/:id/publish (creates publishing record)",
            "GET /job-descriptions/:id/publish (latest publish record)",
            "GET /job-descriptions/:id/publishing (history)",
          ],
          problemsSolved: [
            {
              problem: "Status mismatch (approved vs published) during demo flow.",
              fix: "Ensure publish route updates job_descriptions.status = 'published'.",
              whyItMattered:
                "Demo needs a clean lifecycle state machine that matches what the UI says.",
            },
          ],
        },
      },
      {
        id: "dv-007",
        title: "/routes Endpoint — Debugging Routing Without Guessing",
        date: "2026-03-05",
        badge: "Routing",
        tags: ["Routing", "Testing"],
        excerpt:
          "Built a reliable /routes endpoint. First attempt returned empty due to Express internals; replaced with a robust stack walker.",
        details: {
          problemsSolved: [
            {
              problem: "GET /routes returned count: 0 even though routes existed.",
              fix: "Walked both app.router.stack and app._router.stack and drilled into nested stacks.",
              whyItMattered:
                "Route visibility speeds up debugging and prevents 404 mystery hunts.",
            },
          ],
          endpoints: ["GET /routes"],
        },
      },
      {
        id: "dv-008",
        title: "Request Logging + Correlation IDs — Audit Trail (Enterprise Flex)",
        date: "2026-03-05",
        badge: "Observability",
        tags: ["Observability", "Backend", "Database"],
        excerpt:
          "Added dbo.request_logs + middleware capturing method/path/status/duration/job_description_id. Added correlation IDs and log endpoints for quick review.",
        details: {
          whatWeBuilt: [
            "dbo.request_logs table",
            "Logging middleware (non-blocking, fail-safe)",
            "Correlation IDs via X-Correlation-Id header",
          ],
          endpoints: [
            "GET /request-logs/recent",
            "GET /job-descriptions/:id/request-logs",
          ],
          demoNotes: [
            "This turns a prototype into a believable system: you can prove what happened and when.",
          ],
        },
      },
      {
        id: "dv-009",
        title: "Summary Endpoint — The Game Breaker for UI",
        date: "2026-03-05",
        badge: "Demo",
        tags: ["Demo", "Backend", "Publishing", "Observability"],
        excerpt:
          "Built GET /job-descriptions/:id/summary to return the entire lifecycle in one call (JD + versions + feedback + approvals + publish + logs).",
        details: {
          whatWeBuilt: [
            "GET /job-descriptions/:id/summary",
            "Single payload powering the whole detail page (no 10-request waterfall)",
          ],
          endpoints: ["GET /job-descriptions/:id/summary"],
          demoNotes: [
            "This is what employers love: you optimized the system for reliability + UX.",
          ],
        },
      },
      {
        id: "dv-010",
        title: "Demo Seed + Postman Automation — Repeatable Demos Under Pressure",
        date: "2026-03-05",
        badge: "DevOps",
        tags: ["DevOps", "Demo", "Testing"],
        excerpt:
          "Added POST /demo/seed protected by X-DEMO-KEY. Postman now auto-sets JD_ID + correlation headers so you can demo in one click.",
        details: {
          whatWeBuilt: [
            "POST /demo/seed (creates JD → v1 → v2 → feedback → approval → publish)",
            "Protection: X-DEMO-KEY header (DEMO_SEED_KEY)",
            "Postman env variables: BASE_URL, DEMO_KEY, JD_ID",
            "Postman scripts: auto-store JD_ID + correlation id per run",
          ],
          endpoints: ["POST /demo/seed"],
          demoNotes: [
            "Insurance policy for demo day: generate fresh data instantly if anything gets messy.",
          ],
        },
      },
      {
        id: "dv-011",
        title: "Git Hygiene — .gitignore + Remote Fixes + Monorepo Setup",
        date: "2026-03-05",
        badge: "DevOps",
        tags: ["DevOps"],
        excerpt:
          "Locked .gitignore, kept secrets out of GitHub, fixed origin/remote issues, and set repo naming to NexusV for monorepo growth.",
        details: {
          problemsSolved: [
            {
              problem: "GitHub push failed (repo not found / origin already exists).",
              fix: "Updated remote URL to correct repo name and standardized repo root.",
              whyItMattered:
                "Shipping and collaborating depends on clean Git — this is real engineering work.",
            },
          ],
        },
      },
    ],
    []
  );

  // --- UI State ---
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<Tag>("All");
  const [pageSize, setPageSize] = useState(6); // prevents endless scrolling
  const [selected, setSelected] = useState<LogEntry | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      const tagOk =
        activeTag === "All"
          ? true
          : e.tags.includes(activeTag) || e.badge === activeTag;
      if (!tagOk) return false;

      if (!q) return true;

      const hay = [
        e.title,
        e.excerpt,
        e.badge,
        e.tags.join(" "),
        (e.details.whatWeBuilt || []).join(" "),
        (e.details.endpoints || []).join(" "),
        (e.details.demoNotes || []).join(" "),
        (e.details.screenshots || []).join(" "),
        (e.details.problemsSolved || [])
          .map((p) => `${p.problem} ${p.fix} ${p.whyItMattered}`)
          .join(" "),
      ].join(" ");

      return hay.toLowerCase().includes(q);
    });
  }, [entries, query, activeTag]);

  const visible = useMemo(() => filtered.slice(0, pageSize), [filtered, pageSize]);
  const canLoadMore = filtered.length > pageSize;

  const highlights = useMemo(
    () => [
      {
        title: "One-call UI payload",
        desc: "GET /job-descriptions/:id/summary returns the full lifecycle in one response.",
        tag: "Demo" as Tag,
      },
      {
        title: "Audit trail + correlation IDs",
        desc: "request_logs + X-Correlation-Id makes the system traceable and demo-proof.",
        tag: "Observability" as Tag,
      },
      {
        title: "Repeatable demo automation",
        desc: "POST /demo/seed + Postman scripts creates fresh demo data in seconds.",
        tag: "DevOps" as Tag,
      },
    ],
    []
  );

  return (
    <div className="App">
      <Header
        rightTitle="Currently Working on"
        rightItems={[
          { key: "PROJECT", val: "Nexus V" },
          { key: "STACK", val: "SERN + Copilot Agents + OpenAI" },
          { key: "LAST SHIP", val: "Backend demo-ready + automation" },
        ]}
      />

      <main className="grid">
        <section className="feed">
          <div className="controls card">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <h2>Captain&apos;s Log</h2>
              <span className="subtitle" style={{ opacity: 0.8 }}>
                {filtered.length} entries
              </span>
            </div>

            <div className="terminalSearch">
              <span className="prompt">&gt;</span>
              <input
                className="searchInput"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search logs... (publish, sql, routes, seed, audit, summary)"
              />
            </div>

            <div className="tags">
              {TAGS.map((t) => (
                <button
                  key={t}
                  className={`tag ${activeTag === t ? "active" : ""}`}
                  onClick={() => {
                    setActiveTag(t);
                    setPageSize(6);
                  }}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Highlights (short + impactful, no scroll fatigue) */}
          <div className="card" style={{ marginTop: 14 }}>
            <div className="panelTitle">
              <span className="glitch highlightTitle" data-text="HIGHLIGHTS">
                HIGHLIGHTS
              </span>
            </div>

            <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
              {highlights.map((h) => (
                <button
                  key={h.title}
                  className="card"
                  style={{
                    textAlign: "left",
                    padding: 12,
                    cursor: "pointer",
                    background: "transparent",
                  }}
                  onClick={() => setActiveTag(h.tag)}
                  title="Click to filter log entries"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <strong>{h.title}</strong>
                    <span className="badge shipped">{h.tag}</span>
                  </div>
                  <div style={{ marginTop: 6, opacity: 0.85 }}>{h.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Log entries */}
          <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
            {visible.map((e) => (
              <article
                key={e.id}
                className="post card"
                style={{ cursor: "pointer" }}
                onClick={() => setSelected(e)}
                role="button"
                tabIndex={0}
                onKeyDown={(evt) => {
                  if (evt.key === "Enter" || evt.key === " ") setSelected(e);
                }}
              >
                <div className="postTop">
                  <div>
                    <h2 className="postTitle">{e.title}</h2>
                    <p className="postMeta">
                      {formatDate(e.date)} •{" "}
                      {e.tags.map((t) => t.toLowerCase()).join(" • ")}
                    </p>
                  </div>
                  <span className="badge shipped">{e.badge}</span>
                </div>

                <p className="postExcerpt">{e.excerpt}</p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 10,
                  }}
                >
                  {e.tags.slice(0, 4).map((t) => (
                    <span
                      key={`${e.id}-${t}`}
                      className="tag"
                      style={{ cursor: "pointer" }}
                      onClick={(evt) => {
                        evt.stopPropagation();
                        setActiveTag(t);
                        setPageSize(6);
                      }}
                      title="Filter by this tag"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Pagination (prevents endless scroll) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "14px 0 0",
            }}
          >
            {canLoadMore ? (
              <button
                className="tag"
                onClick={() => setPageSize((s) => s + 6)}
                style={{ padding: "10px 14px" }}
              >
                LOAD MORE ({Math.min(pageSize + 6, filtered.length)}/
                {filtered.length})
              </button>
            ) : (
              <div style={{ opacity: 0.7, padding: 10 }}>
                End of results. Try search or switch tags.
              </div>
            )}
          </div>
        </section>

        {/* Right rail: keeps it readable + shows the plan */}
        <aside className="rail">
          <div className="card railCard">
            <div className="panelTitle">NEXT EXECUTION</div>
            <ul className="railList">
              <li>
                UI wiring: power the detail page with /job-descriptions/:id/summary
              </li>
              <li>Polish: unify response shapes + add helpful error messages</li>
              <li>Demo prep: capture screenshots + record walkthrough</li>
              <li>Team handoff: keep Postman Runner as the demo script</li>
            </ul>
          </div>

          <div className="card railCard" style={{ marginTop: 12 }}>
            <div className="panelTitle">DEMO QUICK LINKS</div>
            <ul className="railList">
              <li>POST /demo/seed (protected)</li>
              <li>GET /job-descriptions/:id/summary</li>
              <li>GET /request-logs/recent</li>
              <li>GET /routes</li>
            </ul>
          </div>
        </aside>
      </main>

      {/* Modal for full entry (prevents endless scroll) */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "grid",
            placeItems: "center",
            padding: 18,
            zIndex: 9999,
          }}
        >
          <div
            className="card"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(900px, 96vw)",
              maxHeight: "88vh",
              overflow: "auto",
              padding: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <h2 style={{ margin: 0 }}>{selected.title}</h2>
                  <span className="badge shipped">{selected.badge}</span>
                </div>
                <div style={{ marginTop: 6, opacity: 0.85 }}>
                  {formatDate(selected.date)} • {selected.tags.join(" • ")}
                </div>
              </div>

              <button
                className="tag"
                onClick={() => setSelected(null)}
                style={{ padding: "10px 14px" }}
              >
                CLOSE
              </button>
            </div>

            <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.5 }}>
              {selected.excerpt}
            </p>

            {/* Details sections */}
            {selected.details.whatWeBuilt?.length ? (
              <>
                <div className="panelTitle" style={{ marginTop: 14 }}>
                  WHAT WE BUILT
                </div>
                <ul className="railList">
                  {selected.details.whatWeBuilt.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </>
            ) : null}

            {selected.details.problemsSolved?.length ? (
              <>
                <div className="panelTitle" style={{ marginTop: 14 }}>
                  PROBLEMS SOLVED
                </div>
                <div style={{ display: "grid", gap: 10 }}>
                  {selected.details.problemsSolved.map((p, idx) => (
                    <div
                      key={`${selected.id}-ps-${idx}`}
                      className="card"
                      style={{ padding: 12 }}
                    >
                      <strong>Problem:</strong>
                      <div style={{ opacity: 0.9, marginTop: 4 }}>
                        {p.problem}
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <strong>Fix:</strong>
                        <div style={{ opacity: 0.9, marginTop: 4 }}>
                          {p.fix}
                        </div>
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <strong>Why it mattered:</strong>
                        <div style={{ opacity: 0.9, marginTop: 4 }}>
                          {p.whyItMattered}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {selected.details.endpoints?.length ? (
              <>
                <div className="panelTitle" style={{ marginTop: 14 }}>
                  ENDPOINTS
                </div>
                <ul className="railList">
                  {selected.details.endpoints.map((x) => (
                    <li key={x}>
                      <code
                        style={{
                          fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        }}
                      >
                        {x}
                      </code>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {selected.details.demoNotes?.length ? (
              <>
                <div className="panelTitle" style={{ marginTop: 14 }}>
                  DEMO NOTES
                </div>
                <ul className="railList">
                  {selected.details.demoNotes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </>
            ) : null}

            {selected.details.screenshots?.length ? (
              <>
                <div className="panelTitle" style={{ marginTop: 14 }}>
                  SCREENSHOTS TO CAPTURE
                </div>
                <ul className="railList">
                  {selected.details.screenshots.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}