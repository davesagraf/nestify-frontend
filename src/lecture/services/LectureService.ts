import { API_URL } from "../../utils/url";
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
