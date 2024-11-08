import { createContext, useState } from 'react';

// Crear el contexto //
const AuthenticationContext = createContext();

// Recuperar token de localStorage
const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

const AuthenticationContextProvider = ({ children }) => {

    const [user, setUser] = useState(getToken);
    // Global para acceder desde todos los metodos //
    const URL = "https://localhost:7212/api/";

    // Metodo para registrar un cliente // Accede al controler del POST de Customer
    const CreateCustomer = async (customerRequest) => {
        try {                                  // Cambio de path //
            const response = await fetch(URL + "customer", {
                // Metodo post del cliente //
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Propio del metodo customer //
                    accept: '*/*',
                },
                body: JSON.stringify(customerRequest),
            });

            if (!response.ok) {
                throw new Error("Error al registrar cliente");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };


    // Metodo para logueo, con authentification //
    const LoginUser = async (userRequest) => {
        try {                                   // path de authentification de swagger //
            const response = await fetch(URL + "Authentication/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    accept: '*/*',
                },
                body: JSON.stringify(userRequest),
            });

            if (!response.ok) {
                throw new Error("Error al registrar cliente");
            }                       // Token lo devuelve como un text, .text (no json)
            const data = await response.text();
            localStorage.setItem("token", data);
            setUser(data);

        } catch (error) {
            console.log(error);
            return null;
        };
    };

    // Le paso a data por props, todos los metodos para retornarlos como valores en el componente AuthenticationContextProvider //
    const data = { CreateCustomer, LoginUser, user };
    return (<AuthenticationContext.Provider value={data}>
        {children}
    </AuthenticationContext.Provider>
    );

};

export { AuthenticationContext };
export default AuthenticationContextProvider;

