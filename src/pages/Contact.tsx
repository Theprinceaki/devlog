import React from "react";
import Header from "../components/Header";

export default function Contact(): React.JSX.Element {
  return (
    <div className="App">
      <Header
        rightTitle="Come Talk To Me"
        rightItems={[
             { key: "EMAIL", val: "mrogers@icstars.org", href: "mailto:mrogers@icstars.org" },
            { key: "GITHUB", val: "Theprinceaki", href: "https://github.com/Theprinceaki" },
            { key: "LINKEDIN", val: "malikakirogers", href: "https://www.linkedin.com/in/malikakirogers/" },
        ]}
      />

      <section className="card">
        <div className="panelTitle">CONTACT</div>
        
        <p className="postExcerpt">
          
        </p>
      </section>
    </div>
  );
}