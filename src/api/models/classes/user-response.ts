export class UserResponse {
  userId: string;
  username: string;

  constructor(userId_: string, username_: string) {
    this.userId = userId_;
    this.username = username_;
  }

  public getUser() {
    return {
      userId: this.userId,
      username: this.username
    }
  }
}