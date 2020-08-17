export class User {
  constructor(
    public id: string,
    public userId: string,
    private _token: string,
    public roleId: string,
    private tokenExpirationDate: Date
  ) {}

  get token() {
    
    return this._token;
  }

  get tokenDuration() {
    if (!this.token) {
      return 0;
    }
    return this.tokenExpirationDate.getTime() - new Date().getTime();
  }
}
