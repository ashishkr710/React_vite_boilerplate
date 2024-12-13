import { axios } from "@axios";
import { useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "../../lib/react-query";

export const getDoctors = (): Promise<any> => {
  return axios.get(`/dashboard/doctors-count`);
};

export const getReferralPlaced = (): Promise<any> => {
  return axios.get(`/dashboard/referral-placed-count`);
};

export const getReferralCompleted = (): Promise<any> => {
  return axios.get(`/dashboard/referral-completed-count`);
};

type QueryFnType = typeof getDoctors;
type QueryFnPlacedType = typeof getReferralPlaced;
type QueryFnCompletedType = typeof getReferralCompleted;

type UseDoctorsOptions = {
  config?: QueryConfig<QueryFnType>;
};
type UseReferralPlacedOptions = {
  config?: QueryConfig<QueryFnType>;
};
type UseReferralCompletedOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useDoctorsCount = ({ config }: UseDoctorsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["doctorsCount"],
    queryFn: () => getDoctors(),
    select: (res: any) => res.data,
    ...config,
  });
};
export const useReferralPlacedCount = ({
  config,
}: UseReferralPlacedOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnPlacedType>>({
    queryKey: ["referralPlacedCount"],
    queryFn: () => getReferralPlaced(),
    select: (res: any) => res.data,
    ...config,
  });
};
export const useReferralCompletedCount = ({
  config,
}: UseReferralCompletedOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnCompletedType>>({
    queryKey: ["referralCompletedCount"],
    queryFn: () => getReferralCompleted(),
    select: (res: any) => res.data,
    ...config,
  });
};
