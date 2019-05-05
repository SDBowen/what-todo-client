import axios from "axios";
import jwtDecode from "jwt-decode";

export const isAuthenticated = () => {
  if (localStorage.whatTodoJwt) {
    setAuthHeader(localStorage.whatTodoJwt);

    const decoded = jwtDecode(localStorage.whatTodoJwt);

    return !(decoded === undefined || null);
  }

  return false;
};

export const setAuthHeader = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
