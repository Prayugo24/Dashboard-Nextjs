export class AuthUser {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public isAdmin: boolean,
      ) {}
}