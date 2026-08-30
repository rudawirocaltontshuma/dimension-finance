import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Nexora Finance",
  shortName: "Nexora",
  tagline: "Financial Management Platform",
  version: packageJson.version,
  copyright: `© ${currentYear}, Nexora Finance. Portfolio demonstration only.`,
  meta: {
    title: "Nexora Finance - Financial Management Platform",
    description:
      "Nexora Finance is a frontend-only financial management and accounting platform demonstration built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Fictional data only — not connected to any bank, payment provider, or accounting system.",
  },
};
