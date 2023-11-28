export interface ShopifyWebhookTopicsModel
{
  api_version: string
  event: any,
  topic: string,
  description?: any,
  readonly created_at: string,
  handlerFunction: string,
  readonly updatedAt: string,
  status: string
}

export interface ShopifyRegisteredWebhooks
{
  shopName: string,
  integrationId: string,
  webhooks: any
}

export interface ShopifyWebhookTopicsRequestModel
{
  event: any,
  topic: string,
  handlerFunction: string,
  description?: any
}