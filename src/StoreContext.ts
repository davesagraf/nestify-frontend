import React from "react";
import { UserDomainStore } from "./user/domain/UserDomainStore";
import { AuthDomainStore } from "./auth/domain/AuthDomainStore";
import { configure, makeAutoObservable } from "mobx";
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
  };
};

const StoresContext = React.createContext(new RootStore());

export const useStores = () => React.useContext(StoresContext);
