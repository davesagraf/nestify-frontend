import { configure, makeAutoObservable } from "mobx";
import { IUser } from "../../user/store/IUserStore";
import { ILecture } from "./ILectureStore";

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

const emptyLecture: ILecture = {
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
  public emptyLecture = emptyLecture;

  constructor() {
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
  };
};
