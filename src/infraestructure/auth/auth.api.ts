import { api } from "../http/axios.config";
import { LoginCredentials } from "@/src/core/interfaces/auth";
import { LoginResponse } from "@/src/application/auth/types/login-response";
import { ApiResponse } from "@/src/presentation/shared/types/api-response";

export const authAPI = {
  async login(data: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    const res = await api.post<ApiResponse<LoginResponse>>("Auth/login", data);
    return res.data;
  },
};
