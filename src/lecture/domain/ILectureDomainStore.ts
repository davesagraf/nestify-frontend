import { IUser } from "../../user/store/IUserStore";
import { ApplyLectureRequestDTO } from "../services/dto/request/ApplyLectureRequestDTO";
import { GetLectureRequestDTO } from "../services/dto/request/GetLectureRequestDTO";
import { LectureService } from "../services/LectureService";
import { ILecture, ILectureStore } from "../store/ILectureStore";

export interface ILectureDomainStore {
    lectureStore: ILectureStore;
    getLectures(setErrorMessage: any): Promise<GetLectureRequestDTO[]>;
    getLectureById(lectureId: string, setErrorMessage: any): Promise<GetLectureRequestDTO>;
    getLectureUsers(lectureId: string, setErrorMessage: any): Promise<IUser[]> ;
    applyLecture(applyLectureRequest: ApplyLectureRequestDTO, setErrorMessage: any): Promise<IUser[]>;
    readonly lectureService: LectureService;
}
