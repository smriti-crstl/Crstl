import { PostPOChangeStateReq } from "domain/entity/edi/models";

export interface PageParams {
  id: string;
  orderId: string;
  version: string;
}

export interface ModalVars {
  newState: PostPOChangeStateReq["newValue"];
  title: string;
  subtitle: string;
}

