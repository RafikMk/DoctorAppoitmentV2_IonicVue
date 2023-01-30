import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login({ email,password }) {
    return api
      .post("/login", {
        email,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, email, password,gender }) {
    return api.post("/signup", {
      gender,
      name:username,
      email,
      password
    });
  }
}

export default new AuthService();
