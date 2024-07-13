import {jwtDecode} from "jwt-decode";

export default function isTokenValid(token) {
  const decodedToken = jwtDecode(token);
  return decodedToken.exp >= decodedToken.iat;
}