import { Notification } from "@typing/global";
import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "../../lib/react-query";
import { axios } from "@axios";

export const getNotifications = (): Promise<Notification[]> => {
  return axios.get(`notification`);
};

export const getNotificationsCount = (): Promise<Notification[]> => {
  return axios.get(`/notification/count`);
};

export const markNotificationsAsRead = (): Promise<Notification[]> => {
  return axios.put(`/notification/mark-as-read`);
};

type QueryFnType = typeof getNotifications;

type UseNotificationsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useNotifications = ({ config }: UseNotificationsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    select: (res: any) => res?.data || [],
    ...config,
  });
};
