import { API_URL } from "../../utils/url";
import { GetUserRequestDTO } from "./dto/request/GetUserRequestDTO";

export class UserService {
  async getUserById(userId: string): Promise<GetUserRequestDTO> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      },
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      throw parsedResponse;
    }
    return parsedResponse;
  }

  async getUserProfile(): Promise<GetUserRequestDTO> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`
      },
    });

    const parsedResponse = await response.json();
    
    if (!response.ok) {
      throw parsedResponse;
    }
    return parsedResponse;
  }
}