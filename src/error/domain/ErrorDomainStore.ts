import { observable } from "mobx";
import { ErrorStore } from "../store/ErrorStore";
import { IError, IErrorStore } from "../store/IErrorStore";
import { IErrorDomainStore } from "./IErrorDomainStore";

export class ErrorDomainStore implements IErrorDomainStore {
  constructor(public errorStore: IErrorStore = new ErrorStore()) {}

  errors = observable.array();

  handleError(error: any): Promise<IError> {
    this.errors.push(error);
    this.setError(error);
    return error;
  }

  setError(error: any) {
    this.errorStore.error = error;
  }
}
