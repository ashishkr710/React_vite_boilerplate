import { User } from "@typing/global";

const storagePrefix = "eye_refer_";

const storage = {
  getToken: () => {
    return JSON.parse(
      window.sessionStorage.getItem(`${storagePrefix}token`) as string
    );
  },
  setToken: (token: string) => {
    window.sessionStorage.setItem(
      `${storagePrefix}token`,
      JSON.stringify(token)
    );
  },
  clearToken: () => {
    window.sessionStorage.removeItem(`${storagePrefix}token`);
    window.sessionStorage.removeItem(`${storagePrefix}token`);
  },
  getUser: () => {
    return JSON.parse(
      window.sessionStorage.getItem(`${storagePrefix}user`) as string
    );
  },
  setUser: (user: User) => {
    window.sessionStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
  },
  clearUser: () => {
    window.sessionStorage.removeItem(`${storagePrefix}user`);
  },
  getChatRoomId: () => {
    return JSON.parse(
      window.sessionStorage.getItem(`${storagePrefix}chatRoomId`) as string
    );
  },
  setChatRoomId: (chatRoomId: number) => {
    window.sessionStorage.setItem(
      `${storagePrefix}chatRoomId`,
      JSON.stringify(chatRoomId)
    );
  },
  clearChatRoomId: () => {
    window.sessionStorage.removeItem(`${storagePrefix}chatRoomId`);
  },
};

export default storage;
