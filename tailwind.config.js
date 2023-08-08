import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */

export default {
    darkMode: "class",
    content: [
        "./resources/views/app.blade.php",
        "./resources/js/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [forms],
};
