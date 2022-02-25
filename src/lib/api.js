const SERVER =
  process.env.NODE_ENV !== "production" ? "http://localhost:3001" : "";

export const ENDPOINTS = {
  register: SERVER + "/signup",
  login: SERVER + "/signin",
};
