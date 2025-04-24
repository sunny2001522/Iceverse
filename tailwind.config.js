/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // 确保包含所有可能的文件类型
    "./*.html", // 如果 HTML 文件在根目录
  ],
  theme: {
    extend: {
      colors: {
        primary: "#99B1F9",
        secondary: "#FFECD2",
        tertiary: "#FACAA8",
      },
    },
    fontFamily: {
      write: ["Playwrite AU SA"],
      body: ['"Open Sans"'],
    },
  },
  plugins: [],
};
