import { configure, makeAutoObservable } from "mobx";
import { ILecture } from "./ILectureStore";

configure({
  enforceActions: "never",
})

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
