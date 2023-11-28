/* eslint no-unused-vars: "off" */

export enum IntegrationTypeModel {
  EDI = "EDI",
  Inventory = "Inventory",
  Accounting = "Accounting",
  ECommerce = "E_Commerce",
  ShippingAndFulfillment = "Shipping_and_Fulfillment",
  Finance = "Finance",
  Payouts = "Payouts",
  Collaboration = "Collaboration",
  Marketing = "Marketing",
  Marketplace = "Marketplace"
}

export enum IntegrationKeyModel {
  SPSCommerce = "sps_commerce",
  Shopify = "shopify",
  QuickbooksOnline = "quickbooks_online",
  QuickbooksDesktop = "quickbooks_desktop",
  B2BGateway = "b2b_gateway",
  Shipstation = "shipstation",
  Xero = "xero",
  BigCommerce = "big_commerce",
  WooCommerce = "woo_commerce",
  Faire = "faire",
  Etsy = "etsy",
  Chase = "chase",
  DearSystems = "dear_systems",
  Amazon = "amazon",
  Paypal = "paypal",
  Affirm = "affirm",
  Railz = "railz",
  Slack = "slack",
  Plaid = "plaid",
  Ramp = "ramp",
  GoogleAds = "fivetran_google_ads",
  FBAds = "fivetran_fb_ads"
}

export interface IntegrationModel {
  integrationSourceId: string;
  props: any;
}
export interface IntegrationUpdate {
  integrationSourceId: string;
  props: any;
}
// eslint-disable-next-line
export interface IntegrationCreate extends IntegrationUpdate {}

export interface IntegrationSourceModel {
  name: string;
  integrationType: IntegrationTypeModel;
  integrationKey: IntegrationKeyModel;
  props?: any;
  imageUrl: string;
  description?: string;
}

export interface CombinedIntegrationSourceModel {
  id: string;
  name: string;
  integrationType: IntegrationTypeModel;
  integrationKey: IntegrationKeyModel;
  description: string;
  imageUrl: string;
  isConnected: boolean;
  isEnabled: boolean;
  isActive: boolean;
  props: any;
  ownerId: string;
  createdBy: string;
  createdAt?: string;
  needsReAuthorization?: boolean;
  assistedIntegration?: boolean;
  integrationId?: string;
}

export interface IntegrationSourceUpdate {
  name: string;
  integrationType: IntegrationTypeModel;
  props: any;
  imageUrl: string;
  integrationKey: string;
  description: string;
  customAppProps?: string;
}

export interface BusinessNameResponse {
  businessName: string;
}

export interface RailzIntegrationResponse {
  connections: {
    data: {
      integrationId: string;
      createdAt: string;
      isEnabled: true;
      connectionId: string;
      serviceName: string;
      institution: string;
      createdAtExt: string;
      createdBy: string;
      integrationAppName: string;
    }[];
  }[];
}

// eslint-disable-next-line
export interface IntegrationSourceCreate extends IntegrationSourceUpdate {}

export interface InitiateShopifyRequest {
  shop: string;
  isCustom?: string;
}

export interface InitiateShopifyResponse {
  authUrl: string;
  integrationLogId: string;
}

export interface FinalizeShopifyPublicResponse {
  integrationId: string;
  onboardingProps?: any;
}

export interface InitiateShopifyQueryRequest {
  hmac?: string;
  shop?: string;
  timestamp?: string;
}

export interface IntegrateShopifyQueryRequest {
  code: string;
  hmac: string;
  host: string;
  shop: string;
  state: string;
  timestamp: string;
  integrationLogId: string;
  isCustom?: string;
}

export interface ShopifyOnboardingRequest {
  integrationId: string;
  onboardingProps: any;
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  orgName: string;
}

export interface IntegrateShopifyResponse {
  message: string;
}

export interface GenericApiResponse {
  code: string;
}

export interface GenericQueryStringRequest {
  queryString: string;
}

export interface SlackRecipientRequest {
  recipient: string;
}
