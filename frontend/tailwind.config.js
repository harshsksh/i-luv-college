/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        bangers: ["Bangers", "cursive"],
      },
      screens: {
        mq1024: {
          raw: "screen and (max-width: 1024px)",
        },
        mq1050: {
          raw: "screen and (max-width: 1050px)",
        },
        mq1000: {
          raw: "screen and (max-width: 1000px)",
        },
        mq900: {
          raw: "screen and (max-width: 900px)",
        },
        mq800: {
          raw: "screen and (max-width: 800px)",
        },
        mq725: {
          raw: "screen and (max-width: 725px)",
        },
        mq700: {
          raw: "screen and (max-width: 700px)",
        },
        mq600: {
          raw: "screen and (max-width: 600px)",
        },
        mq500: {
          raw: "screen and (max-width: 500px)",
        },

        mq450: {
          raw: "screen and (max-width: 450px)",
        },
        mq375: {
          raw: "screen and (max-width: 375px)",
        },
        mq320: {
          raw: "screen and (max-width: 320px)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    themes: [
      {
        "light-theme": {
          primary: "#ff6347", // Tomato
          "primary-content": "#ffffff", // White text on primary
          secondary: "#ffa500", // Orange
          "secondary-content": "#ffffff", // White text on secondary
          accent: "#20b2aa", // Light Sea Green
          "accent-content": "#ffffff", // White text on accent
          neutral: "#333333", // Dark Gray for general text
          "neutral-content": "#f5f5f5", // Whitesmoke text on neutral
          "base-100": "#f5f5f5", // Whitesmoke background
          "base-200": "#e0e0e0", // Slightly darker Whitesmoke for subtle distinctions
          "base-300": "#cccccc", // Even darker Whitesmoke for deeper distinctions
          "base-content": "#333333", // Dark Gray text on base colors
          info: "#1e90ff", // Dodger Blue for informational messages
          "info-content": "#ffffff", // White text on info
          success: "#32cd32", // Lime Green for success messages
          "success-content": "#ffffff", // White text on success
          warning: "#ff8c00", // Dark Orange for warning messages
          "warning-content": "#ffffff", // White text on warning
          error: "#ff4500", // Orange Red for error messages
          "error-content": "#ffffff", // White text on error
        },
        "dark-theme": {
          primary: "#ff4500", // Orange Red
          "primary-content": "#ffffff", // White text on primary
          secondary: "#ff8c00", // Dark Orange
          "secondary-content": "#ffffff", // White text on secondary
          accent: "#20b2aa", // Light Sea Green
          "accent-content": "#ffffff", // White text on accent
          neutral: "#f5f5f5", // Whitesmoke for general text
          "neutral-content": "#333333", // Dark background on neutral
          "base-100": "#333333", // Lighter Dark Gray background
          "base-200": "#2e2e2e", // Slightly darker for subtle distinctions
          "base-300": "#272727", // Even darker for deeper distinctions
          "base-content": "#f5f5f5", // Whitesmoke text on base colors
          info: "#1e90ff", // Dodger Blue for informational messages
          "info-content": "#ffffff", // White text on info
          success: "#32cd32", // Lime Green for success messages
          "success-content": "#ffffff", // White text on success
          warning: "#ffa500", // Orange for warning messages
          "warning-content": "#ffffff", // White text on warning
          error: "#ff6347", // Tomato for error messages
          "error-content": "#ffffff", // White text on error
        },
        // {
        //   "light-theme": {
        //     "primary": "PLACEHOLDER_PRIMARY",             // Primary color for main elements
        //     "primary-content": "PLACEHOLDER_PRIMARY_CONTENT",     // Foreground content color to use on primary
        //     "secondary": "PLACEHOLDER_SECONDARY",           // Secondary color for secondary elements
        //     "secondary-content": "PLACEHOLDER_SECONDARY_CONTENT",   // Foreground content color to use on secondary
        //     "accent": "PLACEHOLDER_ACCENT",              // Accent color for highlighting important elements
        //     "accent-content": "PLACEHOLDER_ACCENT_CONTENT",      // Foreground content color to use on accent
        //     "neutral": "PLACEHOLDER_NEUTRAL",             // Neutral color for general text and icons
        //     "neutral-content": "PLACEHOLDER_NEUTRAL_CONTENT",     // Foreground content color to use on neutral
        //     "base-100": "PLACEHOLDER_BASE_100",            // Base color of page, used for blank backgrounds
        //     "base-200": "PLACEHOLDER_BASE_200",            // Base color, a little darker for subtle distinctions
        //     "base-300": "PLACEHOLDER_BASE_300",            // Base color, even more darker for deeper distinctions
        //     "base-content": "PLACEHOLDER_BASE_CONTENT",        // Foreground content color to use on base color
        //     "info": "PLACEHOLDER_INFO",                // Info color for informational messages
        //     "info-content": "PLACEHOLDER_INFO_CONTENT",        // Foreground content color to use on info
        //     "success": "PLACEHOLDER_SUCCESS",             // Success color for success messages
        //     "success-content": "PLACEHOLDER_SUCCESS_CONTENT",     // Foreground content color to use on success
        //     "warning": "PLACEHOLDER_WARNING",             // Warning color for warning messages
        //     "warning-content": "PLACEHOLDER_WARNING_CONTENT",     // Foreground content color to use on warning
        //     "error": "PLACEHOLDER_ERROR",               // Error color for error messages
        //     "error-content": "PLACEHOLDER_ERROR_CONTENT"        // Foreground content color to use on error
        //   },
        //   "dark-theme": {
        //     "primary": "PLACEHOLDER_PRIMARY",             // Primary color for main elements
        //     "primary-content": "PLACEHOLDER_PRIMARY_CONTENT",     // Foreground content color to use on primary
        //     "secondary": "PLACEHOLDER_SECONDARY",           // Secondary color for secondary elements
        //     "secondary-content": "PLACEHOLDER_SECONDARY_CONTENT",   // Foreground content color to use on secondary
        //     "accent": "PLACEHOLDER_ACCENT",              // Accent color for highlighting important elements
        //     "accent-content": "PLACEHOLDER_ACCENT_CONTENT",      // Foreground content color to use on accent
        //     "neutral": "PLACEHOLDER_NEUTRAL",             // Neutral color for general text and icons
        //     "neutral-content": "PLACEHOLDER_NEUTRAL_CONTENT",     // Foreground content color to use on neutral
        //     "base-100": "PLACEHOLDER_BASE_100",            // Base color of page, used for blank backgrounds
        //     "base-200": "PLACEHOLDER_BASE_200",            // Base color, a little darker for subtle distinctions
        //     "base-300": "PLACEHOLDER_BASE_300",            // Base color, even more darker for deeper distinctions
        //     "base-content": "PLACEHOLDER_BASE_CONTENT",        // Foreground content color to use on base color
        //     "info": "PLACEHOLDER_INFO",                // Info color for informational messages
        //     "info-content": "PLACEHOLDER_INFO_CONTENT",        // Foreground content color to use on info
        //     "success": "PLACEHOLDER_SUCCESS",             // Success color for success messages
        //     "success-content": "PLACEHOLDER_SUCCESS_CONTENT",     // Foreground content color to use on success
        //     "warning": "PLACEHOLDER_WARNING",             // Warning color for warning messages
        //     "warning-content": "PLACEHOLDER_WARNING_CONTENT",     // Foreground content color to use on warning
        //     "error": "PLACEHOLDER_ERROR",               // Error color for error messages
        //     "error-content": "PLACEHOLDER_ERROR_CONTENT"        // Foreground content color to use on error
        //   }
        // }
      },
      "cyberpunk",
      "garden",
      "synthwave",
      "cupcake",
    ],
  },
};
