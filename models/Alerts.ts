export interface AlertsResponse {
 data: {
  id: string;
  createdAt: string;
  type: string;
  subtype: string;
  title: string;
  subtitle: string;
  headline: string;
  body: string[];
  ctaLabel?: string;
  ctaURL?: string;
 }[];
}
