import { ChannelModel } from "@crstl/api/src/apis/models/Channel";
import {
  CommentModel,
  CreateCommentRequest,
  DeleteCommentResponse,
} from "@crstl/api/src/apis/models/Comments";
import { ConfigModel } from "@crstl/api/src/apis/models/config";
import {
  PurchaseOrderResponse,
  PurchaseOrderStatusModel,
  UpdateConfigurableChipsQueryRequest,
  UpdateConfigurableChipsResponse,
} from "@crstl/api/src/apis/models/PurchaseOrder";
import { PurchaseOrderSummaryModel } from "@crstl/api/src/apis/models/PurchaseOrderSummary";

export type ChannelsRes = ChannelModel;
export type TransformedChannels =
  | {
      label: string;
      value: string;
    }[]
  | undefined;

export type OrdersSummaryRes = PurchaseOrderSummaryModel;

export type ShopifyOrdersCountRes = number;

export { PurchaseOrderStatusModel as PurchaseOrderStatusModelFE };

export type OrganizationConfigModelRes = ConfigModel;

export type PurchaseOrderRes = PurchaseOrderResponse;

export type PurchaseOrderResTransformed = {
  id: string;
  orderName: string;
  channelId: string;
  channelName: string;
  // poDate maps to projectedDate
  poDate: string;
  // TODO: Depricated
  requestShipDeliveryDate: string;
  shipTo: string;
  netDays: string;
  // dates
  requestedDelivery?: string;
  earliestShip?: string;
  latestShip?: string;
  requestedShip?: string;
  latestDelivery?: string;
  // shipping details
  // Transform fields to make strings
  netDueDays?: string;
  discountDueDays?: string;
  discountPercentage?: string;
  termsType?: string;
  termsStartDate?: string;
  trackingDetails: Record<string, string>;

  // statuses
  orderStatus: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  deliveryStatus: string;
  invoiceStatus: string;
  chargebackStatus: string;

  // histories
  orderStatusHistory?: Record<string, string>[];
  chargebackStatusHistory?: Record<string, string>[];
  fulfillmentStatusHistory?: Record<string, string>[];
  deliveryStatusHistory?: Record<string, string>[];
  invoiceStatusHistory?: Record<string, string>[];
  paymentStatusHistory?: Record<string, string>[];
  carrierAlphaCode?: string;
  carrierTransMethodCode?: string;
  actualShip?: string;
  scheduledShip?: string;
  orderItems?: Array<Record<string, string>>;
  totalAmount?: number;

  totalNotProvided?: boolean;
  invoiceDocNumber?: string;
  invoiceAmount?: string;
};

export type GetCommentsRes = CommentModel;
export type DeleteCommentRes = DeleteCommentResponse;
export type DeleteCommentReq = { commentId: string };
export type CreateCommentReq = CreateCommentRequest & { poId: string };

export type UpdateConfigurableChipsQueryReq = {
  poId: string;
} & UpdateConfigurableChipsQueryRequest;
export type UpdateConfigurableChipsRes = UpdateConfigurableChipsResponse;
