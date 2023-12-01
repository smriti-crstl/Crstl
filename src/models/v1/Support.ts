export interface GenerateFrontHMACForUser {
  status: number;
  code: string;
  data?: {
    userHash: string;
  };
  error?: {
    message: string;
  };
}
