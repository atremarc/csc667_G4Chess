import axios from "axios";

export default axios.create({
  baseURL: "http://54.153.84.211:9000/",
  responseType: "json"
});