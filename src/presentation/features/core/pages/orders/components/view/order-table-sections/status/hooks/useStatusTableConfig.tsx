import {
  OrganizationConfigModelRes,
  PurchaseOrderResTransformed,
} from "domain/entity/orders/models";
import { StatusLabelFE } from "domain/entity/shared/models";
import { ORDER_DETAILS_TABLE_ROWS_CONFIG } from "presentation/features/core/pages/orders/config/orderDetailsTable";
import { ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS } from "presentation/features/core/pages/orders/constants";

import { StatusModel } from "@crstl/api/src/apis/models/config";

export interface StatusTableConfig {
  label?: string;
  field?: string;
  configData?: {
    value?: string;
    dropdownValues?: StatusModel[];
    parentModule: string;
  };
  updatedBy?: string;
  historyData?: unknown[] | [];
  poId?: string;
  orderName?: string;
  customerName?: string;
}

type Props = {
  orderDetails?: PurchaseOrderResTransformed;
  config?: OrganizationConfigModelRes;
};
export const useStatusTableConfig = ({
  orderDetails,
  config,
}: Props): StatusTableConfig[] => {
  return ORDER_DETAILS_TABLE_ROWS_CONFIG.map(({ label, field }) => {
    const resObj = {
      label,
      field,
      historyData: [],
      // add by history data
      updatedBy: "",
      poId: orderDetails?.id,
      customerName: orderDetails?.channelName,
      orderName: orderDetails?.orderName,
    } as StatusTableConfig;
    switch (field) {
      case ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS.ORDER:
        return {
          ...resObj,
          configData: {
            value: orderDetails?.orderStatus,
            dropdownValues: config?.OrderStatus,
            parentModule: StatusLabelFE.orderStatus,
          },
          historyData: orderDetails?.orderStatusHistory || [],
        };
      case ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS.PAYMENT:
        return {
          ...resObj,
          configData: {
            value: orderDetails?.paymentStatus,
            dropdownValues: config?.Payment,
            parentModule: StatusLabelFE.paymentStatus,
          },
          historyData: orderDetails?.paymentStatusHistory || [],
        };
      case ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS.INVOICING:
        return {
          ...resObj,
          configData: {
            dropdownValues: config?.InvoiceStatus,
            value: orderDetails?.invoiceStatus,
            parentModule: StatusLabelFE.invoiceStatus,
          },
          historyData: orderDetails?.invoiceStatusHistory || [],
        };
      case ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS.DELIVERY_STATUS:
        return {
          ...resObj,
          configData: {
            dropdownValues: config?.DeliveryStatus,
            value: orderDetails?.deliveryStatus,
            parentModule: StatusLabelFE.deliveryStatus,
          },
          historyData: orderDetails?.deliveryStatusHistory || [],
        };
      case ORDER_DETAILS_VIEW_STATUS_TABLE_CONSTANTS.CHARGEBACK:
        return {
          ...resObj,
          configData: {
            dropdownValues: config?.ChargeBackStatus,
            value: orderDetails?.chargebackStatus,
            parentModule: StatusLabelFE.chargebackStatus,
          },
          historyData: orderDetails?.chargebackStatusHistory || [],
        };
      default:
        return { ...resObj };
    }
  });
};
