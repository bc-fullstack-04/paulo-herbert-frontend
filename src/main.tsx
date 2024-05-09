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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Toaster position='top-right' toastOptions={{ duration: 2000 }} />
    <AuthProvider>
      {/* REACT ROUTER 
       <Route path='*' element={<ErrorPage />} />
          
          <Route path='/signup' element={<Signup/>} />
          <Route path='/*' element={<PrivateRoutes />}>
            <Route path='/page02' element={<Page02 />} />
          </Route>*/}
      <BrowserRouter>
        <Routes>
        <Route path='/' index element={<Landing />} />
          
        </Routes>
      </BrowserRouter>
      {/* REACT ROUTER */}
    </AuthProvider>
  </React.Fragment>
)
