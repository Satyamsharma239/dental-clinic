/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#102A43', // Midnight Navy
          light: '#1C3D5A',
          dark: '#0B1D2F',
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          800: '#102A43',
          900: '#0B1D2F',
        },
        bg: {
          DEFAULT: '#F4F7FA', // Cool Off-White
          card: '#FFFFFF',
          muted: '#E4ECF3',
          dark: '#102A43',
        },
        accent: {
          DEFAULT: '#65E6C4', // Fresh Mint Accent
          hover: '#38D9A9',
          light: '#E6FCF5',
          50: '#F0FDF9',
        },
        mint: {
          DEFAULT: '#65E6C4',
          soft: '#E6FCF5',
          dark: '#0FA57E',
        },
        border: {
          DEFAULT: '#DCE6EF', // Soft Blue-Grey
          light: '#EDF2F7',
          dark: '#BCCCDC',
        },
        text: {
          DEFAULT: '#17212B', // Deep Ink
          muted: '#617181',   // Slate Muted
          light: '#829AB1',   // Soft Ash
        },
      },
      fontFamily: {
        heading: ['"Fraunces"', '"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(16, 42, 67, 0.05)',
        card: '0 10px 30px -4px rgba(16, 42, 67, 0.08)',
        hover: '0 20px 40px -8px rgba(16, 42, 67, 0.12)',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
