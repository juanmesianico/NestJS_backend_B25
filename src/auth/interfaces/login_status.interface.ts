import { Role } from "src/user/models/user.enum";

export interface ILoginStatus{

    id: string;
    username: string;
    role: Role;
    accessToken: any;
    expireIn: any;
}