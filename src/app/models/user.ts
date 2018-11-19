export class User {
    constructor(
        public email: string,
        public username: string,
        public password: string,
        public referral_code: string,
        public referred_by: string
    ) { }
}
