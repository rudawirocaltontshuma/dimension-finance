import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Financial Management System",
  shortName: "FMS",
  tagline: "Financial Management Platform",
  version: packageJson.version,
  copyright: `© ${currentYear}, Financial Management System. Frontend build — fictional data only.`,
  meta: {
    title: "Financial Management System — Financial Management Platform",
    description:
      "Financial Management System is a full-featured, frontend-only financial management and accounting platform built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Fictional data only — not connected to any bank, payment provider, or accounting system.",
  },
};
