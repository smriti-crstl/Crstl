import { AxiosResponse } from "axios";

import { API_V1 } from "domain/network";
import { ConnectionsTPFRes } from "../model/index";

const ENDPOINTS = {
  CONNECTIONS: "/edi/trading-partner/connections",
};

export const getConnectionsTPF = async (): Promise<ConnectionsTPFRes> => {
  return await API_V1.get(ENDPOINTS.CONNECTIONS).then(
    (res: AxiosResponse<ConnectionsTPFRes>) => res.data
  );
};

