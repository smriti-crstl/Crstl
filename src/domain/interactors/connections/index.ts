import { useQuery } from "react-query";

import { getConnectionsTPF } from "domain/entity/connections/repositories";

export const QUERY_KEYS = {
  GET_CONNECTIONS: "GET_CONNECTIONS",
};

export const useGetConnectionsTPFQuery = () => {
  return useQuery([QUERY_KEYS.GET_CONNECTIONS], getConnectionsTPF);
};

