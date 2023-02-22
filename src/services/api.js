import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
 // baseURL: "http://204.48.29.155:7080/api",
    baseURL: "http://127.0.0.1:8000/api",

  
  headers: {
    "Content-Type": "application/json",
  //  "Authorization": `Bearer ${this.$store.state.auth.user.accessToken}`,
  "Authorization": `Bearer ${TokenService.getLocalAccessToken()}`,

  },
});

export default instance;
