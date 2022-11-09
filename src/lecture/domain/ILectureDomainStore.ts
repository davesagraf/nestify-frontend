import { IUser } from "../../user/store/IUserStore";
import { ApplyLectureRequestDTO } from "../services/dto/request/ApplyLectureRequestDTO";
import { CreateLectureRequestDTO } from "../services/dto/request/CreateLectureRequestDTO";
import { GetLectureRequestDTO } from "../services/dto/request/GetLectureRequestDTO";
import { UpdateLectureRequestDTO } from "../services/dto/request/UpdateLectureRequestDTO";
import { LectureService } from "../services/LectureService";
import { ILecture, ILectureStore } from "../store/ILectureStore";

export interface ILectureDomainStore {
    lectureStore: ILectureStore;
    getLectures(setError: any): Promise<GetLectureRequestDTO[]>;
    getLectureById(lectureId: string, setError: any): Promise<GetLectureRequestDTO>;
    getLectureUsers(lectureId: string, setError: any): Promise<IUser[]> ;
    applyLecture(applyLectureRequest: ApplyLectureRequestDTO, setError: any): Promise<IUser[]>;
    createLecture(createLectureRequest: ILecture, setError: any): Promise<ILecture>;
    updateLecture(userId: string, updateLectureRequest: ILecture, setError: any): Promise<ILecture>;
    deleteLecture(lectureId: string, setError: any): Promise<void>;
    readonly lectureService: LectureService;
}
