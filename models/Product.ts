export interface ProductModel
{
    sku: string;
    name: string;
    unitPrice: number;
    quantity: number;
}

export interface ProductUpdate
{
    name: string;
    unitPrice: number;
}
export interface ProductCreate extends ProductUpdate
{
    sku: string;
}
