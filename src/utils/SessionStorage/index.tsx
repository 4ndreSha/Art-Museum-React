import React, { createContext, useContext } from "react";
import { SessionStorage } from "./sessionStorage";

interface ISessionStorageContext {
  add: (id: number) => void;
  remove: (id: number) => void;
  getAll: () => number[];
  includes: (id: number) => boolean;
}

export const SessionStorageContext = createContext<ISessionStorageContext>({
  add: () => {
    throw new Error("Use context inside provider");
  },
  remove: () => {
    throw new Error("Use context inside provider");
  },
  getAll: () => {
    throw new Error("Use context inside provider");
  },
  includes: () => {
    throw new Error("Use context inside provider");
  },
});

export function SessionStorageProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionStorageContext.Provider
      value={{
        add: (id: number) => SessionStorage.setId(id),
        remove: (id: number) => SessionStorage.removeId(id),
        getAll: () => SessionStorage.getIdList(),
        includes: (id: number) => SessionStorage.idExists(id),
      }}
    >
      {children}
    </SessionStorageContext.Provider>
  );
}

export const useSessionStorageContext = () => useContext(SessionStorageContext);
