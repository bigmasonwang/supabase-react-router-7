import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login", "routes/login.tsx"),
  route("/signup", "routes/signup.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/auth/confirm", "routes/auth/confirm.tsx"),
  route("/auth/auth-code-error", "routes/auth/auth-code-error.tsx"),
  route("/auth/logout", "routes/auth/logout.tsx"),
] satisfies RouteConfig;
