import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicPage } from '../auth/PublicPage';
import { ProtectedPage } from '../auth/ProtectedPage';
import { Layout } from '../Layout';
import { AuthProvider } from '../auth/AuthProvider';
import { RequireAuth } from '../auth/RequireAuth';
import { LoginPage } from '../auth/LoginPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
