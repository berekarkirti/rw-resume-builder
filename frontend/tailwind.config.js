/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rnw: {
          red: '#C8102E',
          'red-dark': '#9B0A21',
          'red-darker': '#700515',
          'red-light': '#FEE2E2',
          'red-subtle': '#FFF5F5',
          charcoal: '#1F2937',
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          }
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Poppins', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'a4': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        'a4-hover': '0 20px 35px -10px rgba(200, 16, 46, 0.15), 0 0 0 1px rgba(200, 16, 46, 0.2)',
      },
    },
  },
  plugins: [],
}
