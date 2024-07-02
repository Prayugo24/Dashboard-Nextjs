export class AuthUser {
    constructor(
        public username: string,
        public email: string,
        public isAdmin: boolean,
        public token: string,
        public status: string
      ) {}
}

export class ReqAuth {
    constructor(
        public username: string,
        public password: string
    ){}
}