/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0E2A25', // Deep Jade Forest / Obsidian Mineral
          light: '#163E37',
          dark: '#081D1A',
          50: '#F2F7F5',      // Gentle Celadon Pearl
          100: '#DFECE7',     // Fresh Clinical Mint Tint
          200: '#BBD6CD',
          800: '#102E29',
          900: '#091B18',
        },
        bg: {
          DEFAULT: '#FAF8F5', // Warm Porcelain / Enamel Bone
          card: '#FFFFFF',
          muted: '#F1ECE4',
          dark: '#0A1C19',
        },
        accent: {
          DEFAULT: '#D48A36', // Warm Radiant Amber Gold
          hover: '#BA7325',
          light: '#E6A55A',
          50: '#FAF4EC',
        },
        mint: {
          DEFAULT: '#108E6C',
          soft: '#EAF7F2',
          dark: '#0B664D',
        },
        text: {
          DEFAULT: '#15221F', // Rich Obsidian Graphite
          muted: '#52645E',   // Calming Slate Muted
          light: '#889B95',   // Subtle Ash
        },
      },
      fontFamily: {
        heading: ['"Fraunces"', '"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -2px rgba(14, 42, 37, 0.06)',
        card: '0 10px 32px -4px rgba(14, 42, 37, 0.08)',
        hover: '0 18px 46px -6px rgba(14, 42, 37, 0.14)',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
