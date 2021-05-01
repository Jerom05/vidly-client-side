import axios from "axios";
//import auth from "./authService"

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token")
const http ={
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
export default http