"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_ITEMS } from "./constants";

export function FloatingSideNav() {
  const sectionIds = NAV_ITEMS.map((it) => it.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  const handleClick = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="floating-side-nav hidden md:flex" aria-label="Section navigation">
      {NAV_ITEMS.map((it, i) => {
        const isActive = activeSection === it.href.replace("#", "");
        return (
          <div key={it.href} className="flex flex-col items-center">
            {i > 0 && <div className="nav-line" />}
            <button
              onClick={() => handleClick(it.href)}
              className={`nav-dot ${isActive ? "active" : ""}`}
              aria-label={it.label}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="tooltip">{it.label}</span>
            </button>
            {i < NAV_ITEMS.length - 1 && <div className="nav-line" />}
          </div>
        );
      })}
    </nav>
  );
}
