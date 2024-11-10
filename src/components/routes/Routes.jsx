import { Routes, Route } from 'react-router-dom';
import WelcomePage from '../welcomePage/WelcomePage';
import Register from '../register/Register';
import Login from '../login/Login';
import RegisterPro from '../registerPro/RegisterPro';
import ResetPassword from '../resetPassword/ResetPassword';
import HomeClient from '../homeClient/HomeClient';
import HomeProfessional from '../homeProfessional/HomeProfessional';
import ClientSearch from '../clientSearch/ClientSearch';
import React from 'react';
import AdminProtected from './AdminProtected';
import CustomerProtected from './CustomerProtected';
import ProfessionalProtected from './ProfessionalProtected';
import HomeAdmin from '../homeAdmin/HomeAdmin';
import AdminProfessionalSearch from '../adminSearch/AdminProfessionalSearch';
import AdminClientSearch from '../adminSearch/AdminClientSearch';
import ClientReservations from '../clientReservations/ClientReservations';


//debemos importar rutas privadas a este componente.
//ruta privadas debe ir en otro componente.
// 

const RoutesComponent = () => {
  return (

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

      <Route
        path="/reservasClient"
        element={
          <CustomerProtected>
            <ClientReservations />
          </CustomerProtected>
        }
      />


      <Route
        path="/homeAdmin"
        element={
          <AdminProtected>
            <HomeAdmin />
          </AdminProtected>
        }
      />

      <Route
        path="/adminProfessionalSearch"
        element={
          <AdminProtected>
            <AdminProfessionalSearch />
          </AdminProtected>
        }
      />

      <Route
        path="/adminClientSearch"
        element={
          <AdminProtected>
            <AdminClientSearch />
          </AdminProtected>
        }
      />

    </Routes>

  );
};

export default RoutesComponent;