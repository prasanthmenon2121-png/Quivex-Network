/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "card-deeper": "var(--card-deeper)",
        "card-hover": "var(--card-hover)",
        "input-bg": "var(--input-bg)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        accent: "var(--accent)",
        secondary: "var(--secondary)",
        "accent-dark": "var(--accent-dark)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        placeholder: "var(--placeholder)",
        danger: "var(--danger)",
        warning: "var(--warning)",
        qvex: {
          bg: "var(--qvex-bg)",
          primary: "var(--qvex-primary)",
          glow: "var(--qvex-glow)",
        }
      },
      backgroundImage: {
        'bubble-out': 'linear-gradient(135deg, #00FF7F, #39FF14)',
      },
      boxShadow: {
        'glow-sm': '0 0 8px rgba(0, 255, 127, 0.4)',
        'glow-md': '0 0 20px rgba(0, 255, 127, 0.35)',
        'glow-lg': '0 0 40px rgba(0, 255, 127, 0.3)',
      },
      letterSpacing: {
        'widest-xl': '0.2em',
        'logo': '3px',
      }
    },
  },
  plugins: [],
}
