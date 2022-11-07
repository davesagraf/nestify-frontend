import { ILectureDomainStore } from "../domain/ILectureDomainStore";
import { LectureStore } from "../store/LectureStore";
import { ILecture, ILectureStore } from "../store/ILectureStore";
import { LectureService } from "../services/LectureService";
import { GetLectureRequestDTO } from "../services/dto/request/GetLectureRequestDTO";
import { IUser } from "../../user/store/IUserStore";
import { ApplyLectureRequestDTO } from "../services/dto/request/ApplyLectureRequestDTO";
import { CreateLectureRequestDTO } from "../services/dto/request/CreateLectureRequestDTO";
import { UpdateLectureRequestDTO } from "../services/dto/request/UpdateLectureRequestDTO";

export class LectureDomainStore implements ILectureDomainStore {
  constructor(
    public lectureStore: ILectureStore = new LectureStore(),
    readonly lectureService: LectureService = new LectureService()
  ) {}
  async getLectures(setErrorMessage: any): Promise<GetLectureRequestDTO[]> {
    try {
      const lectures = await this.lectureService.getLectures();
      this.setLectures(lectures);
      return lectures;
    } catch (err: any) {
      setErrorMessage(err.error);
      return err.error;
    }
  }

  async createLecture(createLectureRequest: CreateLectureRequestDTO, setErrorMessage: any): Promise<ILecture> {
    try {
      const newLecture = await this.lectureService.createLecture(createLectureRequest);
      this.lectureStore.lectures.push(newLecture);
      return newLecture;
    } catch (err: any) {
      setErrorMessage(err.error);
      return err.error;
    }
  }

  async updateLecture(
    lectureId: string,
    updateLectureRequest: UpdateLectureRequestDTO, 
    setErrorMessage: any): Promise<ILecture> {
    try {
      const updatedLecture = await this.lectureService.updateLecture(
        lectureId,
        updateLectureRequest
      );

      return updatedLecture;
    } catch (err: any) {
      setErrorMessage(err.error);
      return err.error;
    }
  }

  async deleteLecture(lectureId: string, setErrorMessage: any): Promise<void> {
    try {
      const newLectureList = await this.lectureService.deleteLecture(lectureId);
      this.setLectures(newLectureList);
      return newLectureList;
    } catch (err: any) {
      setErrorMessage(err.error)
      return err.error;
    }
  }

  async getLectureUsers(lectureId: string, setErrorMessage: any): Promise<IUser[]> {
    try {
      const lectureUsers = await this.lectureService.getLectureUsers(lectureId);
      this.setLectureUsers(lectureUsers);
      return lectureUsers;
    } catch (err: any) {
      setErrorMessage(err.error);
      return err.error;
    }
  }

  async applyLecture(applyLectureRequest: ApplyLectureRequestDTO, setErrorMessage: any): Promise<IUser[]> {
    try {
      const thisLectureUsers = await this.lectureService.applyLecture(applyLectureRequest);

      return thisLectureUsers;
    } catch (err: any) {
      setErrorMessage(err.error);
      return err.error;
    }
  }

  async getLectureById(lectureId: any, setErrorMessage: any): Promise<GetLectureRequestDTO> {
    try {
      const lecture = await this.lectureService.getLectureById(lectureId);
      this.setLecture(lecture);
      return lecture;
    } catch (err: any) {
      setErrorMessage(err.error);
      return err.error;
    }
  }

  private setLectures(lectures: any) {
    this.lectureStore.lectures = lectures ;
  }

  private setLectureUsers(lectureUsers: IUser[]) {
    this.lectureStore.lectureUsers = lectureUsers;
  }

  private setLecture(lecture: ILecture) {
    this.lectureStore.lecture = lecture ;
  }
}
