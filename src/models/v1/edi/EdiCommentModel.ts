export interface EdiCommentModel {
  orderId: string;
  userId?: string;
  commentDescription?: string;
  attachment?: string;
  readonly createdAt: string;
  readonly id: string;
}
