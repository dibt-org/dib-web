
export class AuthModel {
  constructor(
    private _access_token: string,
    private _refresh_token: string,
    private _expires_in: number,
    private _expirationDate: Date
  ) {
  }

  get token() {
    if (!this._expires_in || !this._expirationDate || new Date() > this._expirationDate) {
      return null;
    }
    return this._access_token;
  }
}
