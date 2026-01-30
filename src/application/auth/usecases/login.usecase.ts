import { authAPI } from "@/src/infraestructure/auth/auth.api";
import { ApiResponse } from "@/src/presentation/shared/types/api-response";
import { LoginCredentials } from "@/src/core/interfaces/auth";
import { LoginResponse } from "../types/login-response";

export async function loginUseCase(data: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
  return await authAPI.login(data);
}
