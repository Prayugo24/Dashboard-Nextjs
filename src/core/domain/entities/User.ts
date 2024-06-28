export class User {
    constructor(
      public id: string,
      public username: string,
      public email: string,
      public password: string,
      public phone: number,
      public address: string,
      public isAdmin: boolean,
      public isActive: boolean,
    ) {}
  }