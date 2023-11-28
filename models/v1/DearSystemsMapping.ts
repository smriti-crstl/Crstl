export type DearSystemsMappingOutput =
  | PostSaleMappingOutput
  | PostSaleQuoteMappingOutput
  | PostSaleOrderMappingOutput
  | PostSaleFulfilmentPickPackMappingOutput;

type ShippingAddress = {
  Line1: string;
  Line2: string;
  City: string;
  State: string;
  Postcode: string;
  Country: string;
};

type Sale = {
  CustomerID: string;
  ExternalId: string;
  BillingAddress: any;
  ShippingAddress: ShippingAddress;
  Location: string;
  AdditionalAttributes: any;
};

export type PostSaleMappingOutput = {
  Sale: Array<Sale>;
};

type SaleLineItems = {
  ProductID: string;
  SKU: string;
  Name: string;
  Quantity: number;
  Price: number;
  Tax?: string;
  TaxRule: string;
  Total: number;
};

export type PostSaleQuoteMappingOutput = {
  SaleID: string;
  Status: "AUTHORISED";
  Lines: Array<SaleLineItems>;
};

export type PostSaleOrderMappingOutput = {
  SaleID: string;
  CombineAdditionalCharges: boolean;
  Memo: string;
  Status: "DRAFT";
  Lines: Array<SaleLineItems>;
};

type PickPackLineItem = {
  ProductID: string;
  SKU: string;
  Name: string;
  Location: string;
  LoctionID: string;
  Quantity: number;
};

export type PostSaleFulfilmentPickPackMappingOutput = {
  TaskId: string;
  Status: "AUTHORISED";
  Lines: Array<PickPackLineItem>;
};

export type DearSystemsMappingInput =
  | SaleMappingInput
  | SaleQuoteOrOrderMappingInput
  | SaleFulfilmentShipMappingInput;

type SaleMappingInput = {
  ID?: string;
  CustomerID: string;
  Location: any;
};

export function saleMappingInput(
  customerId: string,
  location: any,
  id?: string
): SaleMappingInput {
  return {
    ID: id,
    CustomerID: customerId,
    Location: location
  };
}

type ProductDetails = {
  productID: string;
  sku: string;
  name: string;
  barcode: string;
  pricePerUnit: string;
  quantityOrdered: number;
};

type SaleQuoteOrOrderMappingInput = {
  SaleID: string;
  product_ids: Array<ProductDetails>;
};

export function saleQuoteOrOrderMappingInput(
  saleId: string,
  productDetails: Array<ProductDetails>
): SaleQuoteOrOrderMappingInput {
  try {
    const productMappingDetails = productDetails.map((item: any) => {
      return {
        productID: item.productID,
        sku: item.sku,
        name: item.name,
        barcode: item.barcode,
        pricePerUnit: item.pricePerUnit,
        quantityOrdered: item.quantityOrdered
      };
    });

    return {
      SaleID: saleId,
      product_ids: productMappingDetails
    };
  } catch (err) {
    console.log(
      127,
      "err generating the sale quote mapping input",
      JSON.stringify(err)
    );
    throw err;
  }
}

type SaleFulfilmentShipMappingInput = {
  taskId: string;
};
