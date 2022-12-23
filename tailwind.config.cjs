/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
		extend: {
			colors: {
				light: {
					bg: {
						primary: "var(--color-light-bg-primary)",
						secondary: "var(--color-light-secondary)",
					},
					main: {
						primary: "var(--color-light-main-primary)",
						secondary: "var(--color-light-main-secondary)",
						tetiary: "var(--color-light-main-tetiary)",
					},
					separator: "var(--color-light-separator)",
					logo: "var(--color-light-fillOne)",
					text: {
            primary: "var(--color-light-text-primary)",
            secondary: "var(--color-light-text-secondary)",
						muted: "var(--color-light-text-muted)",
					},
				},
			},
		},
	},
	plugins: [],
};
