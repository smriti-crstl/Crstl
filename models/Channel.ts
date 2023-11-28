import { AddressModel } from './ValueTypes';
import { ProductModel } from './Product';

export interface ChannelModel
{
    id: string;
    name: string;
    locations: AddressModel[];
}

export interface ChannelUpdate
{
    name: string;
    locations: AddressModel[];
}

export interface ChannelCreate extends ChannelUpdate
{
	id: string;
}

export interface ChannelProductModel extends ProductModel
{
    channelId: string;
    externalSku: string;
}