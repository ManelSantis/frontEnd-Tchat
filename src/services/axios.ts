import axios from "axios";
import qs from "qs";

const api = axios.create({
    baseURL: "http://localhost:8080",
    auth: {
        username: "tchatdev",
        password: "tchatdevsecret",
    }
});

type LoginData = {
  username: string;
  password: string;
};


export const requestBackendLogin = (loginData: LoginData) => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      };
  
    const data = qs.stringify({
      ...loginData,
      grant_type: 'password',
    });
  
    return api.post("/oauth/token", data, { headers });
  };