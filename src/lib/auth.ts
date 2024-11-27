// Simple authentication (in a real app, this should use a proper auth system)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "wage2024"
};

export const authenticate = (username: string, password: string): boolean => {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const login = () => {
  localStorage.setItem("isAuthenticated", "true");
};

export const logout = () => {
  localStorage.setItem("isAuthenticated", "false");
};