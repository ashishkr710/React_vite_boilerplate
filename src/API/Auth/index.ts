import axios from "axios";
import { UserResponse } from "../types";
import envConfig from "../../environment";
import { socket } from "@utils/socket/socket";

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export type ForgetPasswordDTO = {
  email: string;
};

export type ResetPasswordDTO = {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
};

export type VerifyOtpdDTO = {
  email: string;
  otp: string;
};

export type ResendOtpdDTO = {
  email: string;
};

export type NewPasswordDTO = {
  email: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export type SignupCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  doctorType: string;
};

export const loginUser = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post(`${envConfig.apiUrl}/auth/login`, data);
};

export const logout = () => {
  sessionStorage.clear();
  socket.disconnect();
};

export const signupUser = (
  data: SignupCredentialsDTO
): Promise<UserResponse> => {
  return axios.post(`${envConfig.apiUrl}/auth/signup`, data);
};

export const forgetPassword = (data: ForgetPasswordDTO): Promise<any> => {
  return axios.post(`${envConfig.apiUrl}/auth/forget-password`, data);
};

export const resetPassword = (data: ResetPasswordDTO): Promise<unknown> => {
  return axios.post(`${envConfig.apiUrl}/auth/reset-password`, data);
};

export const setnewPassword = (data: NewPasswordDTO): Promise<unknown> => {
  return axios.post(
    `${envConfig.apiUrl}/auth/new-password?email=${data.email}&oldPassword=${data.oldPassword}`,
    data
  );
};

export const verifyEmailOtp = (data: VerifyOtpdDTO): Promise<unknown> => {
  return axios.post(
    `${envConfig.apiUrl}/auth/verify-email-otp?email=${data.email}`,
    data
  );
};

export const resendOtp = (data: ResendOtpdDTO): Promise<unknown> => {
  return axios.post(
    `${envConfig.apiUrl}/auth/resend-otp?email=${data.email}`,
    data
  );
};
