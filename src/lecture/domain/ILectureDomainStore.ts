import { GetLectureRequestDTO } from "../services/dto/request/GetLectureRequestDTO";
import { LectureService } from "../services/LectureService";
import { ILecture, ILectureStore } from "../store/ILectureStore";

export interface ILectureDomainStore {
    lectureStore: ILectureStore;
    getLectures(setErrorMessage: any): Promise<GetLectureRequestDTO[]>;
    getLectureById(lectureId: string, setErrorMessage: any): Promise<GetLectureRequestDTO>;
    readonly lectureService: LectureService;
}
