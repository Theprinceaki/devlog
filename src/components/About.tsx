import React from "react";
import Header from "./Header";

export default function About(): React.JSX.Element {
  return (
    <div className="App">
      <Header
        rightTitle="STATS"
        rightItems={[
          { key: "Role", val: "Full-Stack Dev" },
          { key: "Current Focus", val: "SERN + AI Agents" },
          { key: "Goal", val: "Ethical Hacker" },
        ]}
      />

      <section className="about card">
        <div className="aboutTop">
          <h2 className="aboutTitle">ABOUT ME</h2>
          <span className="badge">LOCATION: CHICAGO</span>
        </div>

        <p className="aboutText">
          Air Force Vet. Tech Bro. Otaku
          <br />
          I’m a Full-stack dev who creates scalable apps, plugs in AI tools, and runs work the Agile way.
          I build for community impacted solutions and to create my own tech toys. If im not coding its PS5,
          Anime, manga, and tech rabbit holes. My main goal is to master full-stack and transition into ethical
          hacking and penetration testing. Right now I’m building <span className="accent">Nexus V</span>
        </p>

        <div className="aboutGrid">
          <div className="aboutBlock">
            <div className="aboutLabel">FOCUS</div>
            <ul>
              <li>SERN / API builds</li>
              <li>Databases + workflows</li>
              <li>Mastering the use of AI Agents</li>
            </ul>
          </div>

          <div className="aboutBlock">
            <div className="aboutLabel">CURRENT STACK</div>
            <ul>
              <li>Vite + React</li>
              <li>Node + Express</li>
              <li>SQL Server / MySQL</li>
            </ul>
          </div>

          <div className="aboutBlock">
            <div className="aboutLabel">LINKS</div>
            <div className="aboutLinks">
              <a className="linkBtn" href="#" target="_blank" rel="noreferrer">
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}