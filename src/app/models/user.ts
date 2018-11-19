export class User {
    constructor(
        public email: string,
        public username: string,
        public password: string,
        private referral_code: number
    ) { }
}
