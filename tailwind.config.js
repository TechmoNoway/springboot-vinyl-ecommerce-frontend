/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        display: ['"Space Grotesk"', "sans-serif"],
        serif: ['"Playfair Display"', "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        vinyl: {
          900: "#0D0E11",
          800: "#13151A",
          700: "#1A1D24",
          600: "#272B35",
          groove: "#181A20",
        },
        retro: {
          cream: "#FBF9F5",
          paper: "#F4EFE6",
          amber: "#E5A93C",
          gold: "#F5C542",
          orange: "#E07A5F",
          terracotta: "#D9534F",
          sage: "#81B29A",
          forest: "#3D5A50",
          navy: "#22333B",
        },
      },
      boxShadow: {
        retro: "4px 4px 0px #13151A",
        "retro-lg": "6px 6px 0px #13151A",
        "retro-sm": "2px 2px 0px #13151A",
        "retro-amber": "4px 4px 0px #E5A93C",
        "vinyl-glow": "0 0 25px rgba(229, 169, 60, 0.25)",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 8s linear infinite",
        "spin-vinyl": "spin-slow 3s linear infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "slide-up": "slide-up 0.4s ease-out forwards",
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
