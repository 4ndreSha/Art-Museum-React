import React, { createContext, useContext } from "react";

export class SessionStorage {
  static KEY = "favs";

  public static getIdList(): number[] {
    let rawIds: number[];

    try {
      rawIds = JSON.parse(sessionStorage.getItem(SessionStorage.KEY) ?? "[]");
    } catch (e) {
      sessionStorage.setItem(SessionStorage.KEY, "[]");
      rawIds = [];
    }

    return rawIds;
  }

  public static setId(id: number) {
    const idList = SessionStorage.getIdList();
    idList.push(id);
    sessionStorage.setItem(SessionStorage.KEY, JSON.stringify(idList));
  }

  public static removeId(rmId: number) {
    const idList = SessionStorage.getIdList();
    const withoutGivenId = idList.filter((id) => id != rmId);
    sessionStorage.setItem(SessionStorage.KEY, JSON.stringify(withoutGivenId));
  }

  public static idExists(id: number): boolean {
    const ids = SessionStorage.getIdList();
    return ids.includes(id);
  }
}

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
