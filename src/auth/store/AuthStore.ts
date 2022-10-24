import { makeAutoObservable } from "mobx";

export class AuthStore {
  public authenticated = false;

  constructor() {
    makeAutoObservable(this);
  }
}