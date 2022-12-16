import axios from "axios";

// const BASE_URL = "https://ecofreaky.backto.ga/wp-json/wc/v3/";
// const CONSUMER_KEY = "ck_43431f987e7c2c06ac7ed43d9435c9196c62724a";
// const CONSUMER_SECRET = "cs_6c203f7ca12dae935cd27188b71bd6f44ab65093";

const BASE_URL_AUTH = "https://api.ecofreaky.com/api/";

// LocalHost
const BASE_URL = "https://ecofreaky.backto.ga/wp-json/wc/v3/";
const CONSUMER_KEY = "ck_9e32d2dc778b3aeb200034dfa94f5d04d19b57a7";
const CONSUMER_SECRET = "cs_a509bb5440ccc7ea11664f54bb1ac0d8a295b0f2";

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
