import React from "react";
import Header from "./Header";

export default function Home(): React.JSX.Element {
  return (
    <div className="App">
      <Header
        rightTitle="Currently Working on"
        rightItems={[
          { key: "PROJECT", val: "Nexus V" },
          { key: "STACK", val: "SERN + Copilot Agents + OpenAI" },
          { key: "LAST SHIP", val: "Currently in development" },
        ]}
      />

      <main className="grid">
        <section className="feed">
          <div className="controls card">
            <h2>Captain's Log</h2>
            <div className="terminalSearch">
              <span className="prompt">&gt;</span>
              <input
                className="searchInput"
                placeholder="search logs... (ship, hotfix, bug, sprint)"
              />
            </div>

            <div className="tags">
              <button className="tag active">ALL</button>
              <button className="tag">Backend</button>
            </div>
          </div>

          <article className="post card">
            <div className="postTop">
              <div>
                <h2 className="postTitle">Sprint 1 — API Routes Wired</h2>
                <p className="postMeta">2026-03-01 • backend</p>
              </div>
              <span className="badge shipped">Backend</span>
            </div>

            <p className="postExcerpt">
              Connected Express routes, validated payloads, and set up a clean error response format.
            </p>
          </article>
        </section>

        <aside className="rail">
          <div className="card railCard">
            <div className="panelTitle">NEXT EXECUTION</div>
            <ul className="railList">
              <li>Finish Postman tests for routes</li>
              <li>Standardize response schema</li>
              <li>Document env + DB setup</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}