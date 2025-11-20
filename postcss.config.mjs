// postcss.config.mjs 
const config = {
  plugins: {
    // 1. Correct way to include Tailwind CSS
    "@tailwindcss/postcss": {},
    // 2. REQUIRED: Adds vendor prefixes for browser compatibility
    autoprefixer: {}, 
  },
};

export default config;