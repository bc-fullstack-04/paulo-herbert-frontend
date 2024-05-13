import ReactDOM from 'react-dom/client'
import '../app/globals.css';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorPage } from './pages/Navegation/Error';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { MyAlbums } from './pages/MyAlbums';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
    <BrowserRouter >
      <AuthProvider>
        <Routes>
          <Route path='/' errorElement={<ErrorPage/>} index element={<Landing />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='' element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/albums' element={<MyAlbums />} />
          </Route>
        </Routes >
      </AuthProvider>
    </BrowserRouter>
  </React.Fragment>
)
