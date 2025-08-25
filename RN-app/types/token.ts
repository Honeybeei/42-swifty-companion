export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // "access token" expiration time in seconds
  tokenType: string;
  createdAt: number;
}
