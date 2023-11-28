import { API_V1 } from "domain/network";
import { QueryFunctionContext } from "react-query";

import { GetOrgDataRes, PutOrgDataReq, PutOrgDataRes } from "../models";

const ENDPOINTS = {
  ORG_DATA: `/org-data`,
};

export const getOrgData = async ({
  queryKey: [_id, tradingPartner, documentType, contactPeople, intakeForm],
}: QueryFunctionContext<string[]>): Promise<GetOrgDataRes> => {
  return await API_V1.get(ENDPOINTS.ORG_DATA, {
    params: {
      tradingPartner,
      documentType,
      contactPeople,
      intakeForm,
    },
  }).then((res) => res.data);
};

export const putOrgData = async (
  payload: PutOrgDataReq
): Promise<PutOrgDataRes> => {
  return await API_V1.put(ENDPOINTS.ORG_DATA, payload).then((res) => res.data);
};

