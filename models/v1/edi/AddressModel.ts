export interface ShipToModel {
  locationId: number;
  address1: string;
  address2?: string;
  city?: string;
  provinceCode?: number;
  postalCode: string;
  countryCode: string;
  state?: string;
}
