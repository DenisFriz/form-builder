import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";

const apiUrl = import.meta.env.VITE_API_URL;

export const client = new GraphQLClient(apiUrl);

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({ client }),
  tagTypes: ["Forms", "Responses"],
  endpoints: () => ({}),
});
