import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Dimension Finance",
  shortName: "Dimension",
  tagline: "Financial Management Platform",
  version: packageJson.version,
  copyright: `© ${currentYear}, Dimension Finance. Frontend build — fictional data only.`,
  meta: {
    title: "Dimension Finance — Financial Management Platform",
    description:
      "Dimension Finance is a full-featured, frontend-only financial management and accounting platform built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Fictional data only — not connected to any bank, payment provider, or accounting system.",
  },
};
