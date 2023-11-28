import { AxiosResponse } from "axios";
import { API_V2 } from "domain/network";
import { QueryFunctionContext } from "react-query";

import {
  CarrierDocsUrlReq,
  CarrierDocsUrlRes,
  ShipmentDocsUrlRes,
  ShipmentDocUrlParams,
} from "../../models/v2";

const ENDPOINTS = {
  GET_SHIPPING_LABEL_URLS: "/shipping-labels",
  GET_CARRIER_LABEL_URLS: "/shipping-labels/carrier-label",
};

export const getShipmentDocsUrls = async ({
  queryKey: [_id, params],
}: QueryFunctionContext<[string, ShipmentDocUrlParams]>) => {
  return API_V2.get(ENDPOINTS.GET_SHIPPING_LABEL_URLS, {
    params,
  }).then((res: AxiosResponse<ShipmentDocsUrlRes>) => res.data);
};

export const getCarrierDocsUrls = async (
  params: CarrierDocsUrlReq
): Promise<CarrierDocsUrlRes> => {
  const queryString = new URLSearchParams(params).toString();
  const url = `${ENDPOINTS.GET_CARRIER_LABEL_URLS}?${queryString}`;
  return API_V2.get(url).then((res) => res.data);
};

