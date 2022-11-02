import { IUser } from "../../user/store/IUserStore";
import { API_URL } from "../../utils/url";
import { ApplyLectureRequestDTO } from "./dto/request/ApplyLectureRequestDTO";
import { GetLectureRequestDTO } from "./dto/request/GetLectureRequestDTO";

export class LectureService {
    async getLectures(): Promise<GetLectureRequestDTO[]> {
        const jwtToken = localStorage.getItem("access_token");
        const response = await fetch(`${API_URL}/lectures`, {
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

      async getLectureUsers(lectureId: string): Promise<IUser[]> {
        const jwtToken = localStorage.getItem("access_token");
        const response = await fetch(`${API_URL}/lectures/${lectureId}/users`, {
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

      async applyLecture(applyLectureRequest: ApplyLectureRequestDTO): Promise<IUser[]> {
        const jwtToken = localStorage.getItem("access_token");
        const response = await fetch(`${API_URL}/lectures/apply`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`
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
