import { createContext, useState } from 'react';

const AuthenticationContext = createContext();

const getToken = () => {
    const token = localStorage.getItem("token");
    console.log("Token recuperado: ", token);
    return token;
};

const AuthenticationContextProvider = ({ children }) => {

    const [user, setUser] = useState(getToken);
    const URL = "https://localhost:7212/api/";


    const CreateCustomer = async (customerRequest) => {
        try {
            const response = await fetch(URL + "customer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
        try {
            const response = await fetch(URL + "professional", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

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
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getProfessionalById = async (professionalId) => {
        const token = getToken();
        console.log("Token utilizado para la solicitud: ", token);
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
            console.log("Datos del profesional desde la API: ", data);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };


    const getProfessionalByProfession = async (professionalProfession) => {
        const token = getToken();
        console.log("Token utilizado para la solicitud: ", token);
        try {
            const response = await fetch(`${URL}professional/profession/${professionalProfession}`, {
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
            console.log("Datos del profesional desde la API: ", data);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const GetAllProfessionals = async () => {
        const token = getToken();
        try {
            const response = await fetch(`${URL}professional`, {
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
            const response = await fetch(URL + "customer", {
                method: "GET",
                headers: {
                    "Accept": "*/*",
                    "Authorization": `Bearer ${user}`
                },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los datos del cliente");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };



    const updateProfessional = async (professionalId, professionalUpdateRequest) => {
        const token = localStorage.getItem('token');
        const URL = 'https://localhost:7212/api/';

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
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };



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
                return null;
            }
            if (!response.ok) {
                throw new Error("Error al autenticar usuario");
            }

            const token = await response.text();
            localStorage.setItem("token", token);
            setUser(token);

            const decodedToken = decodeJWT(token);
            return decodedToken;

        } catch (error) {
            console.log(error);
            return null;
        }
    };


    const deleteCustomer = async (customerId) => {
        const token = getToken();
        try {
            const response = await fetch(`${URL}customer/${customerId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "text/plain"
                }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el cliente");
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };


    const deleteProfessional = async (professionalId) => {
        const token = getToken();
        try {
            const response = await fetch(`${URL}professional/${professionalId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "text/plain"
                }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el profesional");
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };


    const getMeetingsByCustomerId = async (customerId) => {
        const token = getToken();
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
            return data;
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
                    "Authorization": `Bearer ${token}`,
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
        const token = getToken();
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
            return data;
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
                    "Authorization": `Bearer ${token}`,
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


    const deleteMeeting = async (meetingId) => {
        const token = getToken();
        try {
            const response = await fetch(`${URL}meeting/${meetingId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "text/plain"
                }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar la reunión");
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };


    const createMeeting = async (meetingRequest) => {
        const token = getToken();


        const dateObj = new Date(meetingRequest.dateTime);
        if (isNaN(dateObj)) {
            console.error("Error: meetingRequest.dateTime no es una fecha válida:", meetingRequest.dateTime);
            return null;
        }
        const formattedDate = dateObj.toISOString();
        console.log("Fecha formateada que se enviará:", formattedDate);

        const { customerId, professionalId } = meetingRequest;
        const requestBody = {
            customerId,
            professionalId,
            date: formattedDate,
        };

        console.log("Cuerpo de la solicitud que se enviará:", requestBody);

        try {
            const response = await fetch(`${URL}meeting`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error en la respuesta del servidor:", errorText);
                throw new Error("Error al crear la reunión");
            }

            let data = null;
            const contentLength = response.headers.get("content-length");
            if (contentLength && parseInt(contentLength, 10) > 0) {
                data = await response.json();
            }

            return data;
        } catch (error) {
            console.error("Error en la creación de la reunión:", error);
            return null;
        }
    };
const getAllReservations = async () => {
    const token = getToken();

    try {
        const response = await fetch(`${URL}reservation`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener las reservas");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener las reservas: ", error);
        return null;
    }
};


    const decodeJWT = (token) => {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
    };
    const data = { CreateCustomer, LoginUser, user, CreateProfessional, getCustomerById, updateCustomer, getProfessionalById, getProfessionalByProfession, updateProfessional, deleteCustomer, deleteProfessional, GetAllProfessionals, GetAllCustomers, getMeetingsByCustomerId, getProfessionalInMeetingsById, getMeetingsByProfessionalId, getCustomerInMeetingsById, deleteMeeting, createMeeting, getAllReservations };
    return (<AuthenticationContext.Provider value={data}>
        {children}
    </AuthenticationContext.Provider>
    );

};

export { AuthenticationContext };
export default AuthenticationContextProvider;
