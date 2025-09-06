import React from "react";
import ResourceItem from "./ResourceItem";

/**
 * ResourcesPanel
 * - Lists the repository's resource markdown files and links to their pdf/markdown.
 * - Expects files to be placed in /public/resources/ with matching .md and .pdf names.
 *
 * Usage:
 *   <ResourcesPanel />
 *
 * If you prefer dynamic listing, we can add a small JSON index (public/resources/index.json)
 * generated at build time that this component fetches.
 */

const resources = [
  {
    id: "pia-checklist",
    title: "PIA Checklist",
    filename: "PIA_Checklist",
    description: "Privacy Impact Assessment checklist and guidance.",
  },
  {
    id: "breach-templates",
    title: "Breach Notification Templates",
    filename: "Breach_Notification_Templates",
    description: "Templates and examples for breach notifications.",
  },
  {
    id: "microlearning",
    title: "Microlearning Modules",
    filename: "Microlearning_Modules",
    description: "Short module outlines and study aids.",
  },
];

export default function ResourcesPanel(): JSX.Element {
  return (
    <section aria-labelledby="resources-heading" style={{ padding: 12 }}>
      <h2 id="resources-heading">Training resources</h2>
      <p>Download or view PDF copies of the resources used in training.</p>
      <div style={{ display: "grid", gap: 12 }}>
        {resources.map((r) => (
          <ResourceItem
            key={r.id}
            title={r.title}
            description={r.description}
            markdownPath={`/resources/${r.filename}.md`}
            pdfPath={`/resources/${r.filename}.pdf`}
          />
        ))}
      </div>
    </section>
  );
}