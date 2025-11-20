// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  // 1. The most critical configuration.
  // This tells Tailwind which files to scan for class names so it can generate
  // the minimal required CSS. This ensures your production build is small.
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Standard Next.js 'pages' directory
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Reusable components
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Modern Next.js 'app' directory (App Router)
  ],

  // 2. Customizations for your design system.
  // Use 'extend' to add to the default Tailwind theme, or replace properties entirely.
  theme: {
    extend: {
      // Example of adding a custom primary color:
      colors: {
        'primary': '#0070f3', // Blue color often used for links/buttons
        'sofwerx-secondary': '#1f2937', // Example dark color
      },
      // Example of customizing screen sizes:
      screens: {
        'desktop': '1280px',
      },
      // Example of custom background image utility:
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },

  // 3. Optional: Add Tailwind plugins (e.g., for typography or forms)
  plugins: [
    // require('@tailwindcss/typography'), // Example plugin for styling prose/CMS content
  ],
};

export default config;