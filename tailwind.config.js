/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#B27B1E",
                accent: "#B27B1E",
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
