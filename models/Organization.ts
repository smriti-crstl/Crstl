import { AddressModel } from "./ValueTypes";

export interface OrganizationModel
{
    id: string;
    // Organization Name
    name: string;
    // Email Domain used for accepting more users to the Organization
    emailDomain: string;
    // Main contact at the Organization
    contactEmail: string;
    // IANA timezone string for use with toLocaleString()
    timezoneId: string;
    // Default currency for all transactions
    currencyId: string;
    // Main address for the Organization
    address: AddressModel;
}

export interface OrganizationUpdateRequest
{
    name?: string;
    timezoneId?: string;
    address?: AddressModel;
}

export interface OrganizationUpdateResponse
{
message:string;
}

export interface OrganizationUpdate
{
    // Organization Name
    name: string;
    // Email Domain used for accepting more users to the Organization
    emailDomain?: string;
    // Main contact at the Organization
    contactEmail?: string;
    // IANA timezone string for use with toLocaleString()
    timezoneId?: string;
    // Default currency for all transactions
    currencyId?: string;
    // Main address for the Organization
    address?: AddressModel;
}
// eslint-disable-next-line
export interface OrganizationCreate extends OrganizationUpdate
{
}
