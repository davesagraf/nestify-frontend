import { ILecture } from "../../lecture/store/ILectureStore";
import { API_URL } from "../../utils/url";
import { IUser } from "../store/IUserStore";
import { GetUserRequestDTO } from "./dto/request/GetUserRequestDTO";
import { UpdateUserRequestDTO } from "./dto/request/UpdateUserRequestDTO";

export class UserService {
  async getUserById(userId: string): Promise<IUser> {
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

  async updateUser(userId: string, updateUserRequest: UpdateUserRequestDTO): Promise<IUser> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(updateUserRequest),
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      throw parsedResponse;
    }
    return parsedResponse;
  }

  async deleteUser(userId: string): Promise<void> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      throw parsedResponse;
    }
    return parsedResponse;
  }

  async getUserLectures(userId: string): Promise<Partial<ILecture[]>> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/users/${userId}/lectures`, {
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

  async getAllUsers(): Promise<IUser[]> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/users`, {
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

  async getUserProfile(): Promise<IUser> {
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
