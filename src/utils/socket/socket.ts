import { io } from "socket.io-client";
import envConfig from "../../environment";
import storage from "@utils/storage";

// Your server URL and Options
export const socket = io(envConfig.baseUrl, {
  autoConnect: false,
  auth: {
    token: storage.getToken(),
  },
});
