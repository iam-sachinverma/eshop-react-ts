import axios from "axios";

// LocalHost
const BASE_URL = "https://ecofreaky.com/wp-json/wc/v3/";

export const wooCommerceRequest = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: process.env.REACT_APP_CONSUMER_KEY,
    password: process.env.REACT_APP_CONSUMER_SECRET,
  },
});
