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
import CustomerProtected from './CustomerProtected';
import ProfessionalProtected from './ProfessionalProtected';


const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/registerPro"
          element={
            <ProfessionalProtected>
              <RegisterPro />
            </ProfessionalProtected>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />

        // Ruta Privada para HomeClient
        <Route
          path="/homeClient"
          element={
            <CustomerProtected>
              <HomeClient />
            </CustomerProtected>
          }
        />
        <Route
          path="/homeProfessional"
          element={
            <ProfessionalProtected>
              <HomeProfessional />
            </ProfessionalProtected>
          }
        />
        <Route
          path="/clientSearch"
          element={
            <CustomerProtected>
              <ClientSearch />
            </CustomerProtected>
          }
        />

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