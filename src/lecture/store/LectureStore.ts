import { makeAutoObservable } from "mobx";
import { ILecture, ILectureData } from "./ILectureStore";

const lectures: ILecture[] = [];
const lecture: ILecture = {
  id: 0,
  title: "",
  content: "",
  data: {
    image: "",
    links: [],
    theme: "",
  },
  users: []
};

export class LectureStore {
  public lectures = lectures;
  public lecture = lecture;

  constructor() {
    makeAutoObservable(this);
  }
}
