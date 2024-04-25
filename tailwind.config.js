import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        // 1rem = 16px
        /** 80px size / 84px high / bold */
        mega: ["5rem", { lineHeight: "5.25rem", fontWeight: "700" }],
        /** 56px size / 62px high / bold */
        h1: ["3.5rem", { lineHeight: "3.875rem", fontWeight: "700" }],
        /** 40px size / 48px high / bold */
        h2: ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }],
        /** 32px size / 36px high / bold */
        h3: ["2rem", { lineHeight: "2.25rem", fontWeight: "700" }],
        /** 28px size / 36px high / bold */
        h4: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "700" }],
        /** 24px size / 32px high / bold */
        h5: ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        /** 16px size / 20px high / bold */
        h6: ["1rem", { lineHeight: "1.25rem", fontWeight: "700" }],

        /** 32px size / 36px high / normal */
        "body-2xl": ["2rem", { lineHeight: "2.25rem" }],
        /** 28px size / 36px high / normal */
        "body-xl": ["1.75rem", { lineHeight: "2.25rem" }],
        /** 24px size / 32px high / normal */
        "body-lg": ["1.5rem", { lineHeight: "2rem" }],
        /** 20px size / 28px high / normal */
        "body-md": ["1.25rem", { lineHeight: "1.75rem" }],
        /** 16px size / 20px high / normal */
        "body-sm": ["1rem", { lineHeight: "1.25rem" }],
        /** 14px size / 18px high / normal */
        "body-xs": ["0.875rem", { lineHeight: "1.125rem" }],
        /** 12px size / 16px high / normal */
        "body-2xs": ["0.75rem", { lineHeight: "1rem" }],

        /** 18px size / 24px high / semibold */
        caption: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        /** 12px size / 16px high / bold */
        button: ["0.75rem", { lineHeight: "1rem", fontWeight: "700" }],
      },
    },
  },
  plugins: [typography, forms],
};