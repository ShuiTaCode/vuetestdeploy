import axios from "axios";

// You can uncomment and use any of these API URLs as needed
// const API_URL = '/restapi/v1/';
// const API_URL = "http://192.168.178.41:3000/drumtracker";
const API_URL = "https://shui-ta-express.ew.r.appspot.com/drumtracker";
// const API_URL = "https://wgtoffel-backend.ew.r.appspot.com/";
// const API_URL =
//   "https://3000-cs-1016443639495-default.cs-europe-west1-onse.cloudshell.dev/";

const AXIOS = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default AXIOS;
