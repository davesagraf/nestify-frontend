import { configure, makeAutoObservable } from "mobx";
import { IError } from "./IErrorStore";

const error: IError = {
  error: "",
  status: 0
};

export class ErrorStore {
  public error = error;

  constructor() {
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
  };
};
