import { apiSlice } from "app/api/apiSlice";

const shippingApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getShippingZone: build.query({
      query: () => '',
    })
  })
}) 

export const {
    useGetShippingZoneQuery
} = shippingApiSlice;