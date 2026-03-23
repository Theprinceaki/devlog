import React from "react";
import { NavLink } from "react-router-dom";
import Aki from "../assets/Aki.png";

type HeaderItem = {
  key: string;
  val: string;
  href?: string;
};

type HeaderProps = {
  rightTitle: string;
  rightItems: HeaderItem[];
};

export default function Header({
  rightTitle,
  rightItems,
}: HeaderProps): React.JSX.Element {
  return (
    <header className="header card">
      <div className="header-left">
        <img className="avatar avatar--lg" src={Aki} alt="Aki" />

        <div className="identity">
          <h1 className="name glitch" data-text="MALIK ROGERS">
            MALIK ROGERS
          </h1>

          <p className="subtitle">
            Devlog of the Divine Overlord // receipts included
          </p>

          <div className="badgeRow">
            <span className="badge shipped">STATUS: ACTIVE</span>
            <span className="badge">BUILD: v0.1.0</span>
            <span className="badge">MODE: DEVLOG</span>
          </div>

          <nav className="navRow" aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `linkBtn navBtn ${isActive ? "navBtnActive" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/entries"
              className={({ isActive }) =>
                `linkBtn navBtn ${isActive ? "navBtnActive" : ""}`
              }
            >
              Archive
            </NavLink>

            <NavLink
              to="/entries/new"
              className={({ isActive }) =>
                `linkBtn navBtn ${isActive ? "navBtnActive" : ""}`
              }
            >
              New Entry
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `linkBtn navBtn ${isActive ? "navBtnActive" : ""}`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `linkBtn navBtn ${isActive ? "navBtnActive" : ""}`
              }
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="header-right">
        <div className="panelTitle">{rightTitle}</div>

        <ul className="miniList">
          {rightItems.map((item) => (
            <li key={item.key}>
              <span className="key">{item.key}</span>

              {item.href ? (
                <a
                  className="val linkVal"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.val}
                </a>
              ) : (
                <span className="val">{item.val}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}