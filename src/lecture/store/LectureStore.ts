import { makeAutoObservable } from "mobx";

export class LectureStore {
  public initialLecture = {};

  constructor() {
    makeAutoObservable(this);
  }
}