import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicPage } from '../../auth/view/PublicPage';
import { ProtectedPage } from '../../auth/view/ProtectedPage';
import { Layout } from '../Layout';
import { Auth } from '../../auth/view/Auth';
import { LoginPage } from '../../auth/view/LoginPage';
import { SignUp } from '../../auth/view/SignUp';
import { IAuthDomainStore } from '../../auth/domain/IAuthDomainStore';
import { AuthDomainStore } from '../../auth/domain/AuthDomainStore';
import { observer } from 'mobx-react-lite';

export const App= observer(() => {
  const [authDomain] = useState<IAuthDomainStore>(new AuthDomainStore)
  return (
      <Routes>
        <Route element={<Layout authDomain={authDomain}/>}>
          <Route path="/" element={<PublicPage authDomain={authDomain} />} />
          <Route path="/login" element={<LoginPage authDomain={authDomain}/>} />
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
})
