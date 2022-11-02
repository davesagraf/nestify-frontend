import { configure, makeAutoObservable } from "mobx";
import { IUser } from "../../user/store/IUserStore";
import { ILecture } from "./ILectureStore";

configure({
  enforceActions: "never",
})

const lectureUsers: IUser[] = [];
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
  public lectureUsers = lectureUsers;

  constructor() {
    makeAutoObservable(this);
  }
}
