export interface OrderCountSummaryColorObject {
  backgroundColor: string;
  textColor: string;
  iconColor: string;
  iconBackground: string;
}

export interface OrderCountSummaryObject {
  id: string;
  label: string;
  color: OrderCountSummaryColorObject;
  count: number;
}
