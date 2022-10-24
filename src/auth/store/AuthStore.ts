import { makeAutoObservable } from "mobx";

export class AuthStore {
  public authenticated = false;
  public userExists = false;

  constructor() {
    makeAutoObservable(this);
  }
}