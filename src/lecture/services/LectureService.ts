import { IUser } from "../../user/store/IUserStore";
import { API_URL } from "../../utils/url";
import { ILecture } from "../store/ILectureStore";
import { ApplyLectureRequestDTO } from "./dto/request/ApplyLectureRequestDTO";
import { GetLectureRequestDTO } from "./dto/request/GetLectureRequestDTO";

export class LectureService {
  async getLectures(): Promise<GetLectureRequestDTO[]> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/lectures`, {
      method: "GET",
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

  async getLectureUsers(lectureId: string): Promise<IUser[]> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/lectures/${lectureId}/users`, {
      method: "GET",
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

  async applyLecture(
    applyLectureRequest: ApplyLectureRequestDTO
  ): Promise<IUser[]> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/lectures/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(applyLectureRequest),
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      throw parsedResponse;
    }
    return parsedResponse;
  }

  async getLectureById(lectureId: string): Promise<GetLectureRequestDTO> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/lectures/${lectureId}`, {
      method: "GET",
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

  async createLecture(
    createLectureRequest: ILecture
  ): Promise<ILecture> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/lectures`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(createLectureRequest),
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      throw parsedResponse;
    }
    return parsedResponse;
  }

  async updateLecture(lectureId: string, updateLectureRequest: ILecture): Promise<ILecture> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/lectures/${lectureId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(updateLectureRequest),
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      throw parsedResponse;
    }
    return parsedResponse;
  }

  async deleteLecture(lectureId: string): Promise<void> {
    const jwtToken = localStorage.getItem("access_token");
    const response = await fetch(`${API_URL}/lectures/${lectureId}`, {
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
}
