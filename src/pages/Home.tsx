import React from "react";
import Header from "../components/Header";
import EntriesList from "../components/EntriesList";

export default function Home(): React.JSX.Element {
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
                Mission archive
              </span>
            </div>

            <p className="postExcerpt" style={{ marginTop: 10 }}>
              A running log of what I’m building, fixing, and learning as I grow
              Nexus V into a stronger full-stack system.
            </p>
          </div>

          <EntriesList />
        </section>

        <aside className="rail">
          <div className="card railCard">
            <div className="panelTitle">NEXT EXECUTION</div>
            <ul className="railList">
              <li>UI wiring: connect the summary flow to the frontend</li>
              <li>Polish: tighten response shapes and error handling</li>
              <li>Demo prep: capture screenshots and walkthrough notes</li>
              <li>Team handoff: keep demo flow easy and repeatable</li>
            </ul>
          </div>

          <div className="card railCard" style={{ marginTop: 12 }}>
            <div className="panelTitle">DEMO QUICK LINKS</div>
            <ul className="railList">
              <li>POST /demo/seed</li>
              <li>GET /job-descriptions/:id/summary</li>
              <li>GET /request-logs/recent</li>
              <li>GET /routes</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}