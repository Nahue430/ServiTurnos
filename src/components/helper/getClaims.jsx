import {jwtDecode} from 'jwt-decode';

const getClaimsFromToken = (token) => {
    try {
        const claims = jwtDecode(token);
        return claims;
    } catch (error) {
        console.log("Error al decodificar el token:", error);
        return null;
    }
};

export default getClaimsFromToken;


