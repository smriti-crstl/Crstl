import { API_V1 } from "domain/network";
import { QueryFunctionContext } from "react-query";

import {
  GetContactEmailRes,
  PutContactEmailReq,
  PutContactEmailRes,
} from "../models";

const ENDPOINTS = {
  CONTACT_EMAILS: "/edi/contact-emails",
};

export const getContactEmails = async ({
  queryKey: [_id, config],
}: QueryFunctionContext<string[]>): Promise<GetContactEmailRes> => {
  return await API_V1.get(ENDPOINTS.CONTACT_EMAILS, {
    params: { config: JSON.stringify(config) },
  }).then((res) => res.data);
};

export const updateContactEmail = async (
  payload: PutContactEmailReq
): Promise<PutContactEmailRes> => {
  return await API_V1.put(ENDPOINTS.CONTACT_EMAILS, payload).then(
    (res) => res.data
  );
};

