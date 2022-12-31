import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecofreaky.com/wp-json/wc/v3/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        "Basic " +
          btoa(
            process.env.REACT_APP_CONSUMER_KEY +
              ":" +
              process.env.REACT_APP_CONSUMER_SECRET
          )
      );
      return headers;
    },
    credentials: "include",
  }),
  endpoints: () => ({}),
});
