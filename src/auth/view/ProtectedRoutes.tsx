import { Route, Routes } from "react-router-dom";
import { authRoutes } from "./AuthRoutes";

export const ProtectedRoutes = () => {
  return (
    <Routes>
      {authRoutes.map(({ element: Component, path }) => (
        <Route path={`${path}`} key={path} element={<Component />} />
      ))}
    </Routes>
  );
};
