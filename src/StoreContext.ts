import React from "react";
import { AuthService } from "./services/AuthService";
import { AuthStore } from "./stores/AuthStore";

interface IStoreContext {
  authStore: AuthStore;
}

const authService = new AuthService();
const authStore = new AuthStore(authService);

export const StoreContext = React.createContext<IStoreContext>({
  authStore,
});