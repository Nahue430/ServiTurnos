import { createContext, useState } from 'react';

// Crear el contexto //
const AuthenticationContext = createContext();

// Recuperar token de localStorage
// getToken (revisión)
const getToken = () => {
    const token = localStorage.getItem("token");
    console.log("Token recuperado: ", token);  // Verifica que el token sea el correcto
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
                throw new Error("Error al registrar usuario");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const CreateProfessional = async (professionalRequest) => {
        try {                                  // Cambio de path //
            const response = await fetch(URL + "professional", {
                // Metodo post del cliente //
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Propio del metodo customer //
                    accept: '*/*',
                },
                body: JSON.stringify(professionalRequest),
            });

            if (!response.ok) {
                throw new Error("Error al registrar usuario");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };


    // Método para obtener el cliente por ID
    const getCustomerById = async (customerId) => {
        const token = getToken();
        try {
            const response = await fetch(`${URL}customer/${customerId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener los datos del cliente");
            }

            const data = await response.json();
            return data; // Devolvemos los datos del cliente
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    // Método para actualizar los datos del cliente
    const updateCustomer = async (customerId, customerUpdateRequest) => {
        const token = getToken();
        try {
            const response = await fetch(`${URL}customer/${customerId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(customerUpdateRequest),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar los datos del cliente");
            }

            const data = await response.json();
            return data; // Devolvemos los datos actualizados del cliente
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getProfessionalById = async (professionalId) => {
        const token = getToken();
        console.log("Token utilizado para la solicitud: ", token);  // Verifica el token aquí
        try {
            const response = await fetch(`${URL}professional/${professionalId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los datos del profesional");
            }

            const data = await response.json();
            console.log("Datos del profesional desde la API: ", data);  // Verifica lo que se devuelve
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };


    const getProfessionalByProfession = async (professionalProfession) => {
        const token = getToken();
        console.log("Token utilizado para la solicitud: ", token);  // Verifica el token aquí
        try {
            const response = await fetch(`${URL}professional/profession/${professionalProfession}`, { // Esto modifique en el api.
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los datos del profesional");
            }

            const data = await response.json();
            console.log("Datos del profesional desde la API: ", data);  // Verifica lo que se devuelve
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const GetAllProfessionals = async () => {
        const token = getToken();
        try {
            const response = await fetch(`${URL}professional`, {  // Cambia el endpoint según tu API
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
            });
    
            if (!response.ok) {
                throw new Error("Error al obtener los datos de los profesionales");
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const GetAllCustomers = async () => {
        try {
            // Cambio de path //
            const response = await fetch(URL + "customer", {
                // Método GET del cliente //
                method: "GET",
                headers: {
                    // Headers de la solicitud //
                    "Accept": "*/*",
                    "Authorization": `Bearer ${user}`
                },
            });
    
            if (!response.ok) {
                throw new Error("Error al obtener los datos del cliente");
            }
    
            const data = await response.json();
            return data; // Devolvemos los datos del cliente
        } catch (error) {
            console.log(error);
            return null;
        }
    };


    // Método para actualizar los datos del profesional
    const updateProfessional = async (professionalId, professionalUpdateRequest) => {
        const token = localStorage.getItem('token'); // Obtener el token desde el localStorage o desde otra función
        const URL = 'https://localhost:7212/api/'; // Base URL de la API

        try {
            const response = await fetch(`${URL}professional/${professionalId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(professionalUpdateRequest),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar los datos del profesional");
            }

            const data = await response.json();
            return data; // Devolvemos los datos actualizados del profesional
        } catch (error) {
            console.error(error);
            return null;
        }
    };


    // LoginUser (revisión)
    const LoginUser = async (userRequest) => {
        try {
            const response = await fetch(URL + "Authentication/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    accept: '*/*',
                },
                body: JSON.stringify(userRequest),
            });

            if (response.status === 401) {
                // Si el backend responde con 401, retorna null para indicar credenciales incorrectas
                return null;
            }
            if (!response.ok) {
                throw new Error("Error al autenticar usuario");
            }

            const token = await response.text();
            localStorage.setItem("token", token);
            setUser(token); // Establece el token en el estado

            const decodedToken = decodeJWT(token);  // Decodificar el JWT para obtener el tipo de usuario
            return decodedToken;

        } catch (error) {
            console.log(error);
            return null;
        }
    };

    // Método para eliminar un cliente por ID
const deleteCustomer = async (customerId) => {
    const token = getToken(); // Recupera el token del usuario autenticado
    try {
        const response = await fetch(`${URL}customer/${customerId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`, // Añadir token de autorización
                "Accept": "text/plain" // Acepta texto plano como indica la documentación de la API
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el cliente");
        }

        return true; // Devuelve `true` si la eliminación fue exitosa
    } catch (error) {
        console.error(error);
        return false; // Devuelve `false` en caso de error
    }
};

// Método para eliminar un profesional por ID
const deleteProfessional = async (professionalId) => {
    const token = getToken(); // Recupera el token del usuario autenticado
    try {
        const response = await fetch(`${URL}professional/${professionalId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`, // Añadir token de autorización
                "Accept": "text/plain" // Acepta texto plano según la API
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar el profesional");
        }

        return true; // Devuelve `true` si la eliminación fue exitosa
    } catch (error) {
        console.error(error);
        return false; // Devuelve `false` en caso de error
    }
};

// Método para obtener las reuniones por ID de cliente
const getMeetingsByCustomerId = async (customerId) => {
    const token = getToken(); // Obtener el token de localStorage
    try {
        const response = await fetch(`${URL}meeting/customer/${customerId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "*/*",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener las reuniones del cliente");
        }

        const data = await response.json();
        return data; // Devolver los datos de las reuniones
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getProfessionalInMeetingsById = async (professionalId) => {
    const token = getToken();
    try {
        const response = await fetch(`https://localhost:7212/api/professional/${professionalId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`,  // Agrega aquí el token válido
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos del profesional");
        }

        const data = await response.json();
        console.log("Datos del profesional desde la API: ", data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getMeetingsByProfessionalId = async (professionalId) => {
    const token = getToken(); // Obtener el token de localStorage
    try {
        const response = await fetch(`${URL}meeting/professional/${professionalId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "*/*",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener las reuniones del profesional");
        }

        const data = await response.json();
        return data; // Devolver los datos de las reuniones
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getCustomerInMeetingsById = async (customerId) => {
    const token = getToken();
    try {
        const response = await fetch(`https://localhost:7212/api/customer/${customerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`,  // Agrega aquí el token válido
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos del cliente");
        }

        const data = await response.json();
        console.log("Datos del profesional desde la API: ", data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Método para eliminar una reunión por ID
const deleteMeeting = async (meetingId) => {
    const token = getToken(); // Recupera el token del usuario autenticado
    try {
        const response = await fetch(`${URL}meeting/${meetingId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`, // Añadir token de autorización
                "Accept": "text/plain" // Acepta texto plano según la API
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la reunión");
        }

        return true; // Devuelve `true` si la eliminación fue exitosa
    } catch (error) {
        console.error(error);
        return false; // Devuelve `false` en caso de error
    }
};




    // Función para decodificar el JWT (se asume que tienes la librería jwt-decode)
    const decodeJWT = (token) => {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
    };
    // Le paso a data por props, todos los metodos para retornarlos como valores en el componente AuthenticationContextProvider //
    const data = { CreateCustomer, LoginUser, user, CreateProfessional, getCustomerById, updateCustomer, getProfessionalById,getProfessionalByProfession, updateProfessional, deleteCustomer, deleteProfessional, GetAllProfessionals, GetAllCustomers, getMeetingsByCustomerId, getProfessionalInMeetingsById, getMeetingsByProfessionalId, getCustomerInMeetingsById, deleteMeeting };
    return (<AuthenticationContext.Provider value={data}>
        {children}
    </AuthenticationContext.Provider>
    );

};

export { AuthenticationContext };
export default AuthenticationContextProvider;