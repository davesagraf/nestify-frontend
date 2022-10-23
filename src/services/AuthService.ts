import { LoginRequestDTO } from "../dto/request/LoginRequestDTO";
import { API_URL } from "../utils/url";

export class AuthService {
  async login(loginRequest: LoginRequestDTO) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      throw new Error(parsedResponse);
    }

    return parsedResponse;
  }
}