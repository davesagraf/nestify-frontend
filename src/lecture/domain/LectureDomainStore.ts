import { ILectureDomainStore } from "../domain/ILectureDomainStore";
import { LectureStore } from "../store/LectureStore";
import { ILecture, ILectureStore } from "../store/ILectureStore";
import { LectureService } from "../services/LectureService";
import { GetLectureRequestDTO } from "../services/dto/request/GetLectureRequestDTO";

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

  private setLectures(lectures: ILecture[]) {
    this.lectureStore.lectures = lectures ;
  }

  private setLecture(lecture: ILecture) {
    this.lectureStore.lecture = lecture ;
  }
}
