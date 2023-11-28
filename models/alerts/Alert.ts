export interface AlertSentModel {
  meta?: {
    id: string;
    createdAt: string;
  };
  data?: {
    channel?: string;
    type?: string;
    subtype?: string;
    title?: string;
    subtitle: string;
    payload?: {
      headline?: string;
      body?: string[];
      ctaURL?: string;
      ctaLabel?: string;
    };
  };
}

export interface AlertSentFlattenedModel {
  id: string;
  createdAt: string;
  channel?: string;
  type?: string;
  subtype?: string;
  title?: string;
  subtitle: string;
  headline?: string;
  body?: string[];
  ctaURL?: string;
  ctaLabel?: string;
}
