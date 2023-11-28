export interface MftRefreshTokenInput {
  username: string;
  refreshToken: string;
}

export interface MftRefreshTokenOutput {
  apiToken: string;
  refreshToken: string;
}

export interface authorizeMftResponse {
  apiToken: string;
  refreshToken: string;
  apiTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
}
