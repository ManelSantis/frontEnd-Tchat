import axios from "axios";
import qs from "qs";

const CLIENT_ID = 'tchatdev';
const CLIENT_SECRET = 'tchatdevsecret';

const api = axios.create({
    baseURL: "http://localhost:8080"
});

type LoginData = {
  username: string;
  password: string;
};


export const requestBackendLogin = (loginData: LoginData) => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
      };
  
    const data = qs.stringify({
      ...loginData,
      grant_type: 'password',
    });
  
    return api.post("/oauth/token", data , { headers });
  };

  type SignUpData = {
    email: string;
    password: string;
    name: string;
    birthDate: Date;
    nationality: string;
    defaultLanguage: string;    
};

export const requestBackendSignUp = (data: SignUpData) => {
    return api.post("api/users/register", data);
}