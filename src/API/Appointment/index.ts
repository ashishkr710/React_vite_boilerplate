import { axios } from "@axios";
import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "../../lib/react-query";
import { defaultParams } from "@utils/global.constants";

export type AddAppointment = {
  patientUserId: string;
  date: string;
  appointmentType: string;
};

export const getAppointments = ({
  search = "",
  sort = "updatedAt",
  order = "DESC",
  page = 1,
  limit = 10,
}): Promise<any> => {
  return axios.get(
    `appointment?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`
  );
};

export const getAppointmentsByDoctorId = ({
  search = "",
  sort = "updatedAt",
  order = "DESC",
  page = 1,
  limit = 10,
}): Promise<any> => {
  return axios.get(
    `appointment/list-by-doctor-id?search=${search}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`
  );
};

export const getAppointmentById = ({ id }: { id: string }): Promise<any> => {
  return axios.get(`appointment/${id}`, {
    params: {
      id,
    },
  });
};

export const addAppointment = (payload: AddAppointment): Promise<any> => {
  return axios.post(`appointment`, payload);
};

export const editAppointment = (
  id: string,
  payload: AddAppointment
): Promise<any> => {
  return axios.put(`appointment/${id}`, payload);
};

export const cancelAppointment = ({ id }: { id: string }): Promise<any> => {
  return axios.put(`appointment/cancel/${id}`);
};

export const completeAppointment = ({ id }: { id: string }): Promise<any> => {
  return axios.put(`appointment/complete/${id}`);
};

export const deleteAppointment = ({ id }: { id: string }): Promise<any> => {
  return axios.delete(`appointment/${id}`);
};

type QueryFnType = typeof getAppointments;

type UseAppointmentsOptions = {
  params?: {
    search?: string;
    sort?: string;
    order?: string;
    page?: number;
    limit?: number;
  };
  config?: QueryConfig<QueryFnType>;
};

type UseAppointmentsByIdOptions = {
  id: string;
  config?: QueryConfig<QueryFnType>;
};

export const useAppointments = ({
  params = defaultParams,
  config,
}: UseAppointmentsOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { search, ...otherParams } = params;
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["appointments", otherParams],
    queryFn: () => getAppointmentsByDoctorId(params),
    select: (res: any) => res.data,
    ...config,
  });
};

export const useAppointmentsById = ({
  id,
  config,
}: UseAppointmentsByIdOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["appointment", id],
    queryFn: () => (id ? getAppointmentById({ id }) : false),
    select: (data: any) => data.result,
    ...config,
  });
};
