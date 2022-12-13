import axios from "axios";

// const BASE_URL = "https://ecofreaky.backto.ga/wp-json/wc/v3/";
// const CONSUMER_KEY = "ck_43431f987e7c2c06ac7ed43d9435c9196c62724a";
// const CONSUMER_SECRET = "cs_6c203f7ca12dae935cd27188b71bd6f44ab65093";

const BASE_URL_AUTH = "https://api.ecofreaky.com/api/";

// LocalHost
const BASE_URL = "https://localhost/ecofreaky/wp-json/wc/v3/";
const CONSUMER_KEY = "ck_6b930278029a3b1ff9aa5d67398a5eece868e56f";
const CONSUMER_SECRET = "cs_e4cede534905be5c38ba81b488aee74589d16e23";

export const wooCommerceRequest = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET,
  },
});

export const getTokenFromStorage = () => {
  try {
    const TOKEN = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).user
    ).currentUser.token;
    return TOKEN;
  } catch (error) {
    console.log(error);
  }
};

export const ecoFreakyRequest = axios.create({
  baseURL: BASE_URL_AUTH,
});
