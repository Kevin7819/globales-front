/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tailwind v2 uses `purge` instead of `content`; keep both for compatibility
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  // Safelist ensures these classes aren't purged in production builds
  safelist: [
    'from-orange-500',
    'to-orange-600',
    'bg-gradient-to-r',
  ],
  plugins: [],
}
