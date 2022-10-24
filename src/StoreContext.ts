import React from "react";
import { AuthDomainStore } from "./auth/domain/AuthDomainStore";
import { AuthService } from "./auth/services/AuthService";

interface IStoreContext {
  authDomainStore: AuthDomainStore
}

const authService = new AuthService();
const authDomainStore = new AuthDomainStore();

export const StoreContext = React.createContext<IStoreContext>({
  authDomainStore
});