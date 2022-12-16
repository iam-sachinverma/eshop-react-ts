import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const consumerKey = "ck_9e32d2dc778b3aeb200034dfa94f5d04d19b57a7";
const consumerSecret = "cs_a509bb5440ccc7ea11664f54bb1ac0d8a295b0f2";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecofreaky.backto.ga/wp-json/wc/v3/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        "Basic " + btoa(consumerKey + ":" + consumerSecret)
      );
      return headers;
    },
    credentials: "include",
  }),
  endpoints: () => ({}),
});
