import React from "react";
import { UserDomainStore } from "./user/domain/UserDomainStore";
import { AuthDomainStore } from "./auth/domain/AuthDomainStore";
import { configure, makeAutoObservable, onReactionError } from "mobx";
import { LectureDomainStore } from "./lecture/domain/LectureDomainStore";
import { ErrorDomainStore } from "./error/domain/ErrorDomainStore";

class RootStore {
  public userDomain = new UserDomainStore();
  public authDomain = new AuthDomainStore();
  public lectureDomain = new LectureDomainStore();
  public errorDomain = new ErrorDomainStore();

  constructor() {
    makeAutoObservable(this);
    configure({
      enforceActions: "never",
    });
    onReactionError((error, _reaction) => {
      this.errorDomain.handleError(error);
    });
  };
};

const StoresContext = React.createContext(new RootStore());

export const useStores = () => React.useContext(StoresContext);
