import { JwtPayload } from "jwt-decode";

export interface DecodedToken extends JwtPayload {
    id: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
}
