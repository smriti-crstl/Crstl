/* eslint camelcase: "off" */

export interface AddressModel
{
    address1: string;
    address2?: string;
    city?: string;
    region?: string;
    postalCode: string;
    country: string;
    state?: string;
    
}

export interface CurrencyModel
{
    Entity: string;
    Currency: string;
    Alphabetic_Code: string;
    Numeric_Code: number;
}

export interface TimezoneModelResponse
{
    id: string;
    timezone: string;
    offset: number;
    offset_dst: number;
    canBeSelected?: boolean;
    altLabel?: string;
}
