import React from "react";
import { UserDomainStore } from "./user/domain/UserDomainStore";
import { AuthDomainStore } from "./auth/domain/AuthDomainStore";
import { makeAutoObservable } from "mobx";

class RootStore {
  public userDomain = new UserDomainStore();
  public authDomain = new AuthDomainStore();

  constructor() {
    makeAutoObservable(this);
  }
}

const StoresContext = React.createContext(new RootStore());

export const useStores = () => React.useContext(StoresContext);
