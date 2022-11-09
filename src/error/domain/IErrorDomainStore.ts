import { IError, IErrorStore } from "../store/IErrorStore";

export interface IErrorDomainStore {
  errorStore: IErrorStore;
  handleError(error: IError): Promise<IError>;
  setError(error: any): void;
}
