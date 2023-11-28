export interface CommentModel {
  fullName: string;
  orderId: string;
  userId?: string;
  commentDescription?: string;
  attachment?: string;
  isDeleted?: boolean;
  readonly createdAt: string;
  readonly id: string;
}

export interface CreateCommentRequest {
  file?: any;
  commentDescription?: string;
}

export interface DeleteCommentResponse {
  message: string;
}
