import ReactDOM from 'react-dom/client'
import './global.css';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Page02 } from './pages/Navegation/Page02';
import { ErrorPage } from './pages/Navegation/Error';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/' index element={<Landing />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} /> 
        <Route path='' element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
        </Route> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.Fragment>
)
