module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAF8F5',
          pure: '#FFFFFF',
          subtle: '#F4F0EB',
          muted: '#ECE7DF',
        },
        ink: {
          DEFAULT: '#1A201C',
          secondary: '#3D4641',
          muted: '#6A756F',
          light: '#98A39D',
        },
        sage: {
          900: '#182A20',
          800: '#223C2D',
          700: '#2C503D',
          600: '#39674E',
          500: '#4A7F62',
          200: '#CDE0D4',
          100: '#E2ECE5',
          50: '#F0F5F2',
        },
        sand: {
          800: '#6F5230',
          700: '#8C683D',
          600: '#B08753',
          500: '#C7A06F',
          200: '#EADEC7',
          100: '#F4EDE0',
          50: '#FAF6F0',
        },
        hairline: '#E5E0D8',
        border: {
          subtle: '#ECE7DF',
          DEFAULT: '#E0D9CE',
          strong: '#B8AEA0',
        },
        whatsapp: {
          DEFAULT: '#1EBE5D',
          dark: '#169C4B',
          light: '#E8F8EE',
        },
        brand: {
          50: '#F0F5F2',
          100: '#E2ECE5',
          200: '#CDE0D4',
          500: '#4A7F62',
          600: '#2C503D',
          700: '#223C2D',
          800: '#182A20',
          900: '#111F17',
        },
        surface: {
          DEFAULT: '#FAF8F5',
          subtle: '#F4F0EB',
          muted: '#ECE7DF',
        },
        slate: {
          DEFAULT: '#1A201C',
          secondary: '#3D4641',
          muted: '#6A756F',
        },
      },
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        container: '1240px',
      },
      borderRadius: {
        none: '0px',
        sm: '3px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
};
