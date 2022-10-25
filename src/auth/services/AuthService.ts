import { LoginRequestDTO } from "./dto/request/LoginRequestDTO";
import { SignUpRequestDTO } from "./dto/request/SignUpRequestDTO";
import { API_URL } from "../../utils/url";

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
      throw parsedResponse;
    }
    return parsedResponse;
  }

  async signup(signUpRequest: SignUpRequestDTO) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpRequest),
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      throw parsedResponse;
    }
    return parsedResponse;
  }
}
