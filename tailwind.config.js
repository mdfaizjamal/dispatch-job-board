/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        boarddeep: "#0D1117",
        board: "#161B22",
        panel: "#1B222C",
        teal: "#0F3D3E",
        tealbright: "#1C6B6C",
        amber: "#F2B84B",
        ink: "#EDEBE3",
        muted: "#8B96A1",
        line: "#2A323C",
        open: "#4CAF7D",
        closed: "#E2665A",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateX(90deg)", opacity: "0" },
          "60%": { transform: "rotateX(-10deg)", opacity: "1" },
          "100%": { transform: "rotateX(0deg)", opacity: "1" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        flip: "flip 0.5s ease-out both",
        blink: "blink 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
