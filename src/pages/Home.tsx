import React from "react";
import Header from "../components/Header";
import EntriesList from "../components/EntriesList";
import { FaReact, FaNodeJs, FaGithub } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiMysql, SiPostman } from "react-icons/si";

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
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#00d9ff",
                  textShadow: "0 0 10px rgba(0, 217, 255, 0.25)",
                }}
              >
                Captain&apos;s Log
              </h2>

              <div className="stack-icons">
                <span className="stack-icon" title="React">
                  <FaReact />
                </span>

                <span className="stack-icon" title="TypeScript">
                  <SiTypescript />
                </span>

                <span className="stack-icon" title="JavaScript">
                  <SiJavascript />
                </span>

                <span className="stack-icon" title="Node.js">
                  <FaNodeJs />
                </span>

                <span className="stack-icon" title="MySQL">
                  <SiMysql />
                </span>

                <span className="stack-icon" title="GitHub">
                  <FaGithub />
                </span>

                <span className="stack-icon" title="Postman">
                  <SiPostman />
                </span>
              </div>

              <span
                className="subtitle"
                style={{
                  opacity: 0.8,
                  color: "#f5f7ff",
                }}
              >
                Mission archive
              </span>
            </div>
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
            <div className="panelTitle">Possible Projects</div>
            <ul className="railList">
              <li>simple Weather app</li>
              <li>AI chatbot</li>
              <li>Currency Converter</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}