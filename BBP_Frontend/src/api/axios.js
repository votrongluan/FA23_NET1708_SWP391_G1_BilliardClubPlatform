import axios from "axios";

export const baseURL = "https://billard-booking-project.azurewebsites.net/api";

export default axios.create({
  baseURL,
});
