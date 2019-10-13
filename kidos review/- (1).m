// Frontside:
//	- error-handling: doesnt tell you when password is correct input/ gives wrong information output
//	- Login refactor: 
  //  - Make one file for all the authentication:
  class AuthService {
	  service = axios.create({
	  baseURL: `${process.env.REACT_APP_API_URL}`,
	  withCredentials: true
	  });
	  signup = (username, password) => {
	  return this.service
	  .post("/signup", { username, password })
	  .then(response => response.data);
	  };
	  login = (username, password) => {
	  return this.service
	  .post("/login", { username, password })
	  .then(response => response.data);
	  };
	  logout = () => {
	  return this.service.post("/logout").then(response => response.data);
	  };
	  

