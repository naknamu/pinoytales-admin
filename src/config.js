// config.js
const config = {
  apiUrl:
    process.env.NODE_ENV === "development" ? "http://localhost:3000/api" : "https://pinoytales-production.up.railway.app/api",

  userUrl:
    process.env.NODE_ENV === "development" ? "http://localhost:3000/user" : "",
};

export default config;
