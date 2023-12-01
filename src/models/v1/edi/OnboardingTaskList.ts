export interface OnboardingTaskList {
  status: number;
  code: string;
  data: {
    lanes?: OnboardingTaskData[];
    error?: string;
  };
}

export interface OnboardingTaskData {
  id: string;
  title: string;
  cards: CardData[];
  style: {
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    borderStyle: string;
  };
}

export interface CardData {
  id?: string;
  title?: string;
  description?: string;
  eta_timestamp?: string;
  completed_timestamp?: string;
  created_timestamp?: string;
  trading_partner_name?: string;
  trading_partner_id?: string;
  assigned_to_user?: boolean;
  connection_type?: string;
  user_task_type?: string;
}

export interface OnboardingPendingCounts {
  status: number;
  code: string;
  data: {
    count?: number;
    error?: string;
  };
}
