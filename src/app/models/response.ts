import { User } from "./user";

export class Response {
    constructor(
        public user: User,
        public message: string
    ) { }
}