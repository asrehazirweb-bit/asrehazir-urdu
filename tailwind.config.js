/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'light',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#AA792D",
                accent: "#AA792D",
                secondary: "#2B2523",
            },
            fontFamily: {
                serif: ['"Noto Nastaliq Urdu"', 'serif'],
                sans: ['"Noto Nastaliq Urdu"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
