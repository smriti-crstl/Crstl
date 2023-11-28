import { ShipNoticeSortByOption } from "presentation/features/core/pages/edi-shipment/sub-components/ShipNoticeConfig";

export interface ShipmentDocUrlItem {
  label_type: string;
  signed_url: string;
  expires: string;
}

export interface ShipmentDocsUrlRes {
  status: number;
  code: string;
  data: ShipmentDocUrlItem[];
}

export interface ShipmentDocUrlParams {
  asn_id: string;
  sort_by: ShipNoticeSortByOption;
  regenerate: boolean;
}

export interface CarrierDocsUrlReq {
  asn_id: string;
  carrier_type?: CarrierType;
  service_type?: ServiceType;
  parcel_length?: string;
  parcel_width?: string;
  parcel_height?: string;
  parcel_weight?: string;
  regenerate?: boolean;
}

export enum FedexServiceType {
  FEDEX_2_DAY = "FEDEX_2_DAY",
  FEDEX_2_DAY_AM = "FEDEX_2_DAY_AM",
  FEDEX_EXPRESS_SAVER = "FEDEX_EXPRESS_SAVER",
  FEDEX_GROUND = "FEDEX_GROUND",
  FEDEX_INTERNATIONAL_CONNECT_PLUS = "FEDEX_INTERNATIONAL_CONNECT_PLUS",
  FIRST_OVERNIGHT = "FIRST_OVERNIGHT",
  GROUND_HOME_DELIVERY = "GROUND_HOME_DELIVERY",
  INTERNATIONAL_ECONOMY = "INTERNATIONAL_ECONOMY",
  INTERNATIONAL_FIRST = "INTERNATIONAL_FIRST",
  INTERNATIONAL_PRIORITY = "INTERNATIONAL_PRIORITY",
  PRIORITY_OVERNIGHT = "PRIORITY_OVERNIGHT",
  SMART_POST = "SMART_POST",
  STANDARD_OVERNIGHT = "STANDARD_OVERNIGHT",
}
export enum UPSServiceType {
  GROUND = "Ground",
  UPS_STANDARD = "UPSStandard",
  UPS_SAVER = "UPSSaver",
  EXPRESS = "Express",
  EXPRESS_PLUS = "ExpressPlus",
  EXPEDITED = "Expedited",
  NEXT_DAY_AIR = "NextDayAir",
  NEXT_DAY_AIR_SAVER = "NextDayAirSaver",
  NEXT_DAY_AIR_EARLY_AM = "NextDayAirEarlyAM",
  SECOND_DAY_AIR = "2ndDayAir",
  SECOND_DAY_AIR_AM = "2ndDayAirAM",
  THREE_DAY_SELECT = "3DaySelect",
}

export enum CarrierType {
  FedEx = "FedexAccount",
  UPS = "UpsAccount",
}

export enum ShippingLabelType {
  "shipping_label" = "shipping_label",
  "packing_slip" = "packing_slip",
  "pallet_label" = "pallet_label",
  "carrier_label" = "carrier_label",
}

export type ServiceType = FedexServiceType | UPSServiceType;

export interface ShippingLabelInfo {
  label_type: string;
  signed_url: string;
  expires: string;
  carrier_type: ServiceType;
  service_type: CarrierType;
  parcel: {
    length: string;
    width: string;
    height: string;
    weight: string;
  };
}

export interface CarrierDocsUrlRes {
  status: number;
  code: string;
  data: Array<ShippingLabelInfo>;
}

