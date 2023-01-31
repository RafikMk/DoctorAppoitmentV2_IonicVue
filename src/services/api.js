import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  //  "Authorization": `Bearer ${this.$store.state.auth.user.accessToken}`,
  "Authorization": `Bearer ${TokenService.getLocalAccessToken()}`,

  },
});

export default instance;
