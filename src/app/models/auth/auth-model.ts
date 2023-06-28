export class AuthModel {
  constructor(
    private _access_token: string,
    private _refresh_token: string,
    private _expires_in: number
  ) {
  }

  public get accessToken(): string | null {
    console.log("new Date(): ", new Date())
    console.log("this.getExpirationDate(this._expiresIn): ", this.getExpirationDate(this._expires_in))
    console.log("new Date() > this.getExpirationDate(this._expiresIn): ", new Date() > this.getExpirationDate(this._expires_in))

    if (new Date() > this.getExpirationDate(this._expires_in)) {
      return null;
    }
    return this._access_token;
  }


  private getExpirationDate(expiresIn: number): Date {
    return new Date(expiresIn * 1000);
  }

}
