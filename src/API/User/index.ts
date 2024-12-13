import { User } from "@typing/global";
import axios from "axios";
import envConfig from "../../environment";
import storage from "@utils/storage";

export type ChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const getUser = (): Promise<User> => {
  return axios.get(`${envConfig.apiUrl}/profile`, {
    headers: {
      authorization: `Bearer ${storage.getToken()}`,
      Accept: "application/json",
    },
  });
};

export const updateUser = (payload: any): Promise<User> => {
  return axios.put(`${envConfig.apiUrl}/profile`, payload, {
    headers: {
      authorization: `Bearer ${storage.getToken()}`,
      Accept: "application/json",
    },
  });
};

export const uploadProfileImage = (payload: FormData): Promise<User> => {
  return axios.put(`${envConfig.apiUrl}/profile/profile-image`, payload, {
    headers: {
      authorization: `Bearer ${storage.getToken()}`,
      Accept: "application/json",
    },
  });
};

export const changePassword = (data: ChangePassword): Promise<User> => {
  return axios.put(`${envConfig.apiUrl}/profile/change-password`, data, {
    headers: {
      authorization: `Bearer ${storage.getToken()}`,
      Accept: "application/json",
    },
  });
};
