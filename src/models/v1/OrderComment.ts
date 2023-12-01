export interface OrderCommentModel
{
  key?: number
  id?: string
  created_at?: Date
  created_by?: string
  updated_at?: Date | null
  updated_by?: string | null
  order_id?: string
  comment_description?: string
  image_url?: string;
  deleted_at?: Date | null
}