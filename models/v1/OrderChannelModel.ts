import { OrderChannelTypeV1 } from "../../../domain/v1/OrderChannelType";

export interface OrderChannelModelV1 {
  id: string;
  type: OrderChannelTypeV1;
  name: string;
}
