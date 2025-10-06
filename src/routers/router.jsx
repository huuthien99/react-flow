import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProcedurePage = lazy(() => import("@/pages/procedure/ProcedurePage"));
const ProcedureAddPage = lazy(() =>
  import("@/pages/procedure/ProcedureAddPage")
);
const ProcedureDetailPage = lazy(() =>
  import("@/pages/procedure/ProcedureDetailPage")
);
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));

export const routes = [
  {
    path: "/procedure",
    element: (
      <ProtectedRoute>
        <ProcedurePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/procedure/new",
    element: (
      <ProtectedRoute>
        <ProcedureAddPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/procedure/:id",
    element: (
      <ProtectedRoute>
        <ProcedureDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
];
