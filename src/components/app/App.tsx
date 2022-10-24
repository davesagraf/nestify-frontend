import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicPage } from '../../auth/view/PublicPage';
import { ProtectedPage } from '../../auth/view/ProtectedPage';
import { Layout } from '../Layout';
import { Auth } from '../../auth/view/Auth';
import { LoginPage } from '../../auth/view/LoginPage';
import { SignUp } from '../../auth/view/SignUp';

export const App: React.FC = () => {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <Auth>
                <ProtectedPage />
              </Auth>
            }
          />
        </Route>
      </Routes>
  );
}
