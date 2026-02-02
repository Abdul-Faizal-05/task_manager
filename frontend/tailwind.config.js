/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#5b7fff',
                secondary: '#2d3a8c',
                success: '#0d9488',
                warning: '#f59e0b',
                danger: '#ef4444',
                pink: '#ec4899',
            },
        },
    },
    plugins: [],
}
