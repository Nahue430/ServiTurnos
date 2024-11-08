import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from '../welcomePage/WelcomePage';
import Register from '../register/Register';
import Login from '../login/Login';
import RegisterPro from '../registerPro/RegisterPro';
import ResetPassword from '../resetPassword/ResetPassword';
import HomeClient from '../homeClient/HomeClient';
import HomeProfessional from '../homeProfessional/HomeProfessional';
import ClientSearch from '../clientSearch/ClientSearch';
import ManagementUsers from '../managementUsers/ManagementUsers'; // Ruta corregida
import React from 'react';
import UserProtected from './UserProtected';
import AdminProtected from './AdminProtected';


const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerPro" element={<RegisterPro />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        // Ruta Privada para HomeClient
        <Route
          path="/homeClient"
          element={
            <UserProtected>
              <HomeClient />
            </UserProtected>
          }
        />
        <Route path="/homeProfessional" element={<HomeProfessional />} />
        <Route path="/clientSearch" element={<ClientSearch />} />

        {/* Ruta Privada para Administrador */}
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <ManagementUsers />
            </AdminProtected>
          }
        />

      </Routes>
    </Router>
  );
};

export default RoutesComponent;