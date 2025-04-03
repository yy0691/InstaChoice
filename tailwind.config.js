/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      perspective: {
        'none': 'none',
        '500': '500px',
        '1000': '1000px',
        '2000': '2000px',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        product: {
          phone: "hsl(var(--product-phone))",
          laptop: "hsl(var(--product-laptop))",
          mouse: "hsl(var(--product-mouse))",
          keyboard: "hsl(var(--product-keyboard))",
          monitor: "hsl(var(--product-monitor))",
        },
      },
      backgroundImage: {
        'gradient-phone': 'linear-gradient(to right, hsl(var(--product-phone)/30%), hsl(var(--product-phone)/10%))',
        'gradient-laptop': 'linear-gradient(to right, hsl(var(--product-laptop)/30%), hsl(var(--product-laptop)/10%))',
        'gradient-mouse': 'linear-gradient(to right, hsl(var(--product-mouse)/30%), hsl(var(--product-mouse)/10%))',
        'gradient-keyboard': 'linear-gradient(to right, hsl(var(--product-keyboard)/30%), hsl(var(--product-keyboard)/10%))',
        'gradient-monitor': 'linear-gradient(to right, hsl(var(--product-monitor)/30%), hsl(var(--product-monitor)/10%))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        "pulse-glow": {
          "0%": { boxShadow: "0 0 0 0 rgba(146, 100, 255, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(146, 100, 255, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(146, 100, 255, 0)" },
        },
        "fade-in": {
          "from": { opacity: 0, transform: "translateY(10px)" },
          "to": { opacity: 1, transform: "translateY(0)" },
        },
        "scale-in": {
          "from": { transform: "scale(0.95)", opacity: 0 },
          "to": { transform: "scale(1)", opacity: 1 },
        },
        "gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s infinite",
        "pulse-glow": "pulse-glow 2s infinite",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "scale-in": "scale-in 0.2s ease-out forwards",
        "gradient": "gradient 15s ease infinite",
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.perspective-none': {
          perspective: 'none',
        },
        '.perspective-500': {
          perspective: '500px',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-2000': {
          perspective: '2000px',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}; 