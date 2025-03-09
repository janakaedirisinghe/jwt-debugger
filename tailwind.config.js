/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          'mono': ['"Fira Code"', 'monospace'],
        },
        colors: {
          primary: {
            500: '#6366f1', // indigo-500
            600: '#4f46e5', // indigo-600
            700: '#4338ca', // indigo-700
            800: '#3730a3', // indigo-800
          },
          'method': {
            'get': '#10b981',    // green-500
            'post': '#3b82f6',   // blue-500
            'put': '#eab308',    // yellow-500
            'delete': '#ef4444', // red-500
          }
        },
        transitionProperty: {
          'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        },
        transitionDuration: {
          '300': '300ms',
        },
      },
    },
    plugins: [],
  }