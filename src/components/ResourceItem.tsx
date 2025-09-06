import React from "react";

/**
 * ResourceItem
 * Props:
 *  - title: string
 *  - description: string
 *  - markdownPath: string (relative public path)
 *  - pdfPath: string (relative public path)
 *
 * This is intentionally framework-agnostic; adjust imports/styles if using your app's UI system.
 */

type Props = {
  title: string;
  description?: string;
  markdownPath: string;
  pdfPath: string;
};

export default function ResourceItem({ title, description, markdownPath, pdfPath }: Props) {
  return (
    <article style={{ border: "1px solid #e6e6e6", padding: 12, borderRadius: 6 }}>
      <h3 style={{ margin: "0 0 6px 0" }}>{title}</h3>
      {description && <p style={{ margin: "0 0 12px 0", color: "#444" }}>{description}</p>}
      <div style={{ display: "flex", gap: 8 }}>
        <a href={pdfPath} download aria-label={`Download ${title} as PDF`} style={{ textDecoration: "none" }}>
          <button type="button">Download PDF</button>
        </a>
        <a href={markdownPath} target="_blank" rel="noreferrer" aria-label={`View ${title} markdown`}>
          <button type="button">View Markdown</button>
        </a>
      </div>
    </article>
  );
}