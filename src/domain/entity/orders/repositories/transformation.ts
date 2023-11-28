import { format } from "date-fns-tz";
import {
  ChannelsRes,
  PurchaseOrderRes,
  PurchaseOrderResTransformed,
  TransformedChannels,
} from "domain/entity/orders/models";
import { DEFAULT_FNS_DATE_FORMAT } from "globals/configs";

export const transformChannels = (
  data: ChannelsRes[] | undefined
): TransformedChannels => {
  if (data) {
    return data.map((item) => ({
      label: item.name,
      value: item.name,
    }));
  } else {
    return [];
  }
};

const makeAddressString = (...args: Array<string | undefined>): string => {
  return args
    .map((item, index) => {
      if (item) {
        // If , then no space, otherwise add a space
        const isSpaceNotRequired = !!(
          args[index + 1] && args[index + 1] === ","
        );
        return item + (isSpaceNotRequired ? "" : " ");
      } else {
        return "";
      }
    })
    .join("");
};

export const transformPurchaseOrderDetails = (
  poDetails: PurchaseOrderRes
): PurchaseOrderResTransformed => {
  return {
    channelId: poDetails.channelId || "",
    channelName: poDetails.channelName || "",
    id: poDetails.id,
    netDays: poDetails.paymentTerms || "",
    orderName: poDetails.orderName || "",
    // TODO: change this date to hold IANA timezone strings
    poDate: poDetails.receivedAt || "",
    // TODO: Depricated
    requestShipDeliveryDate: poDetails.shipWindow?.dateTo
      ? format(
          new Date(poDetails.shipWindow.dateTo || ""),
          DEFAULT_FNS_DATE_FORMAT
        )
      : "",
    shipTo: makeAddressString(
      poDetails.shipTo?.address1,
      poDetails.shipTo?.address2,
      poDetails.shipTo?.city,
      ",",
      poDetails.shipTo?.region,
      poDetails.shipTo?.country,
      poDetails.shipTo?.postalCode
    ),
    requestedDelivery: poDetails.dates?.requestedDelivery,
    earliestShip: poDetails.dates?.earliestShip,
    latestShip: poDetails.dates?.latestShip,
    requestedShip: poDetails.dates?.requestedShip,
    latestDelivery: poDetails.dates?.latestDelivery,
    netDueDays: poDetails.moneyDetails?.netDueDays,
    discountDueDays: poDetails.moneyDetails?.discountDueDays,
    discountPercentage: poDetails.moneyDetails?.discountPercentage,
    termsType: poDetails.moneyDetails?.termsType,
    termsStartDate: poDetails.moneyDetails?.termsStartDate,
    trackingDetails: poDetails.trackingDetails || {},

    // statuses
    orderStatus: poDetails.orderStatus || "",
    chargebackStatus: poDetails.chargebackStatus || "",
    fulfillmentStatus: poDetails.fulfillmentStatus || "",
    deliveryStatus: poDetails.deliveryStatus || "",
    invoiceStatus: poDetails.invoiceStatus || "",
    paymentStatus: poDetails.paymentStatus || "",

    // histories
    orderStatusHistory: poDetails.statusHistory,
    chargebackStatusHistory: poDetails.chargebackStatusHistory,
    fulfillmentStatusHistory: poDetails.fulfillmentStatusHistory,
    deliveryStatusHistory: poDetails.deliveryStatusHistory,
    invoiceStatusHistory: poDetails.invoiceStatusHistory,
    paymentStatusHistory: poDetails.paymentStatusHistory,
    carrierAlphaCode: poDetails.carrierInformation?.carrierAlphaCode,
    carrierTransMethodCode:
      poDetails.carrierInformation?.carrierTransMethodCode,
    actualShip: poDetails.dates856?.actualShip,
    scheduledShip: poDetails.dates856?.scheduledShip,
    orderItems: poDetails.orderItems,
    totalAmount: poDetails.totalAmount,
    totalNotProvided: poDetails.totalNotProvided,
    invoiceDocNumber: poDetails.invoiceDocNumber,
    invoiceAmount: poDetails.invoiceAmount,
  };
};
