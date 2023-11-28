export interface SlackInitiateIntegrationModel {
  data: {
    uri: string;
    integrationLogId: string;
  }; // {uri: string, integrationLogId: string}
}

export interface SlackCreateIntegrationModel {
  data: boolean;
}

export interface SlackAddRecipientModel {
  data: boolean;
}

export interface SlackRecipientModel {
  data: {
    id: string;
    name: string;
  }[];
}

export interface SlackChannelItemModel {
  id: string;
  name: string;
}

export interface SlackChannelModel {
  data: SlackChannelItemModel[];
}
