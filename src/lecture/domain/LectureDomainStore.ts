import { ILectureDomainStore } from "../domain/ILectureDomainStore";
import { LectureStore } from "../store/LectureStore";
import { ILecture, ILectureStore } from "../store/ILectureStore";
import { LectureService } from "../services/LectureService";
import { GetLectureRequestDTO } from "../services/dto/request/GetLectureRequestDTO";
import { IUser } from "../../user/store/IUserStore";
import { ApplyLectureRequestDTO } from "../services/dto/request/ApplyLectureRequestDTO";
import { tryCatchWrap } from "../../utils/tryCatchWrap";

export class LectureDomainStore implements ILectureDomainStore {
  constructor(
    public lectureStore: ILectureStore = new LectureStore(),
    readonly lectureService: LectureService = new LectureService()
  ) {}
  
  async getLectures(setError: any): Promise<GetLectureRequestDTO[]> {
    return tryCatchWrap(async () => {
      const lectures = await this.lectureService.getLectures();
      this.setLectures(lectures);
      return lectures;
    }, setError)
  };

  async createLecture(createLectureRequest: ILecture, setError: any): Promise<ILecture> {
    return tryCatchWrap(async () => {
      const newLecture = await this.lectureService.createLecture(createLectureRequest);
      this.lectureStore.lectures.push(newLecture);
      return newLecture;
    }, setError)
  }

  async updateLecture(
    lectureId: string,
    updateLectureRequest: ILecture, 
    setError: any): Promise<ILecture> {
    return tryCatchWrap(async () => {
      const updatedLecture = await this.lectureService.updateLecture(
        lectureId,
        updateLectureRequest
      );
      return updatedLecture;
    }, setError)
  }

  async deleteLecture(lectureId: string, setError: any): Promise<void> {
    return tryCatchWrap(async () => {
      const newLectureList = await this.lectureService.deleteLecture(lectureId);
      this.setLectures(newLectureList);
      return newLectureList;
    }, setError)
  }

  async getLectureUsers(lectureId: string, setError: any): Promise<IUser[]> {
    return tryCatchWrap(async () => {
      const lectureUsers = await this.lectureService.getLectureUsers(lectureId);
      this.setLectureUsers(lectureUsers);
      return lectureUsers;
    }, setError)
  }

  async applyLecture(applyLectureRequest: ApplyLectureRequestDTO, setError: any): Promise<IUser[]> {
    return tryCatchWrap(async () => {
      const thisLectureUsers = await this.lectureService.applyLecture(applyLectureRequest);
      return thisLectureUsers;
    }, setError)
  }

  async getLectureById(lectureId: any, setError: any): Promise<GetLectureRequestDTO> {
    return tryCatchWrap(async () => {
      const lecture = await this.lectureService.getLectureById(lectureId);
      this.setLecture(lecture);
      return lecture;   
    }, setError)
  }

  private setLectures(lectures: any) {
    this.lectureStore.lectures = lectures ;
  }

  private setLectureUsers(lectureUsers: IUser[]) {
    this.lectureStore.lectureUsers = lectureUsers;
  }

  setLecture(lecture: ILecture) {
    this.lectureStore.lecture = lecture ;
  }
}
