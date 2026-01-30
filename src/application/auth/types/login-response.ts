import { IUser } from "@/src/core/interfaces/user/user.interface";

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: IUser;
}