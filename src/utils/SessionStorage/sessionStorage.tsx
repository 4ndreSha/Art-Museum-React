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
