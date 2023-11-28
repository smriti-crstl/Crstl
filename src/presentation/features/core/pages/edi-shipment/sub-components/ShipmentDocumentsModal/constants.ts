import {
  CarrierType,
  FedexServiceType,
  UPSServiceType,
} from "domain/entity/edi/models/v2";

export const SHIPMENT_DOCUMENTS_SORT_CONFIG = "edi-shipment-docs-sort-config";

export const carriers = [
  { value: CarrierType.FedEx, label: "Fedex" },
  { value: CarrierType.UPS, label: "UPS" },
];

export const serviceTypes = {
  FedexAccount: [
    { value: FedexServiceType.FEDEX_2_DAY, label: "Fedex 2 Day" },
    { value: FedexServiceType.FEDEX_2_DAY_AM, label: "Fedex 2 Day AM" },
    {
      value: FedexServiceType.FEDEX_EXPRESS_SAVER,
      label: "Fedex Express Saver",
    },
    { value: FedexServiceType.FEDEX_GROUND, label: "Fedex Ground" },
    {
      value: FedexServiceType.FEDEX_INTERNATIONAL_CONNECT_PLUS,
      label: "Fedex International Connect Plus",
    },
    { value: FedexServiceType.FIRST_OVERNIGHT, label: "First Overnight" },
    {
      value: FedexServiceType.GROUND_HOME_DELIVERY,
      label: "Ground Home Delivery",
    },
    {
      value: FedexServiceType.INTERNATIONAL_ECONOMY,
      label: "International Economy",
    },
    {
      value: FedexServiceType.INTERNATIONAL_FIRST,
      label: "International First",
    },
    {
      value: FedexServiceType.INTERNATIONAL_PRIORITY,
      label: "International Priority",
    },
    { value: FedexServiceType.PRIORITY_OVERNIGHT, label: "Priority Overnight" },
    { value: FedexServiceType.SMART_POST, label: "Smart Post" },
    { value: FedexServiceType.STANDARD_OVERNIGHT, label: "Standard Overnight" },
  ],
  UpsAccount: [
    { value: UPSServiceType.GROUND, label: "Ground" },
    { value: UPSServiceType.UPS_STANDARD, label: "UPS Standard" },
    { value: UPSServiceType.UPS_SAVER, label: "UPS Saver" },
    { value: UPSServiceType.EXPRESS, label: "Express" },
    { value: UPSServiceType.EXPRESS_PLUS, label: "Express Plus" },
    { value: UPSServiceType.EXPEDITED, label: "Expedited" },
    { value: UPSServiceType.NEXT_DAY_AIR, label: "Next Day Air" },
    { value: UPSServiceType.NEXT_DAY_AIR_SAVER, label: "Next Day Air Saver" },
    {
      value: UPSServiceType.NEXT_DAY_AIR_EARLY_AM,
      label: "Next Day Air Early AM",
    },
    { value: UPSServiceType.SECOND_DAY_AIR, label: "2nd Day Air" },
    { value: UPSServiceType.SECOND_DAY_AIR_AM, label: "2nd Day Air AM" },
    { value: UPSServiceType.THREE_DAY_SELECT, label: "3 Day Select" },
  ],
};

