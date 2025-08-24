/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apparently MDS has several inconsistent primary color
        'mds': '#EA1C2D', //taken from the MDS logo
        'mds-pattern': '#E2002B', //taken from the MDS login pattern image
        'mds-com': '#EB0029', //taken from MDS logo in www.matahari.com
      }
    },
    fontSize: {
      'xs': ['0.6rem'],
      'sm': ['0.75rem'],
      'xl': ['1.25rem'],
      '2xl': ['1.5rem'],
      '3xl': ['1.875rem'],
      '4xl': ['2.25rem'],
      '5xl': ['3rem'],
      '6xl': ['3.75rem'],
      '7xl': ['4.5rem'],
      '8xl': ['6rem'],
      '9xl': ['8rem'],
    },
  },
  plugins: [],
}

