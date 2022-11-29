export class Tokens {
  accessToken: string;
  refreshToken: string;

  constructor(accessToken_: string, refreshToken_: string) {
    this.accessToken = accessToken_;
    this.refreshToken = refreshToken_;
  }

  public getTokens() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }
  }
}