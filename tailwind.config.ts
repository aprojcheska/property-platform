import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ["var(--font-poppins)"],
                body: ["var(--font-open-sans)"],
            },
        },
    },
    plugins: [],
}

export default config