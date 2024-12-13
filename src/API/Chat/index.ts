import { axios } from "@axios";
import { useInfiniteQuery, useQuery } from "react-query";
import { ExtractFnReturnType, QueryConfig } from "../../lib/react-query";
import { Address } from "@typing/global";

export const getChatMessages = (
  roomId: number,
  offset = 0,
  limit = 50
): Promise<any> => {
  return axios.get(`chat/messages/${roomId}?offset=${offset}&limit=${limit}`);
};

export const getChatInbox = (
  doctorId: number,
  search: string
): Promise<any> => {
  return axios.get(`chat/inbox/${doctorId}?search=${search}`); // doctorId from  doctor table
};

export const markRoomMessagesRead = (roomId: string): Promise<any> => {
  return axios.put(`chat/mark-read/${roomId}`); // doctorId from  doctor table
};

type QueryFnType = typeof getChatMessages;

type QueryInboxFnType = typeof getChatInbox;

type UseChatMessagesOptions = {
  roomId: number;
  limit?: number;
  config?: QueryConfig<QueryFnType>;
};

type UseChatInboxOptions = {
  doctorId: number; // doctorId from  doctor table
  search: string;
  config?: QueryConfig<QueryFnType>;
};

export const useChatMessages = ({
  roomId,
  limit = 50,
  config,
}: UseChatMessagesOptions) => {
  return useInfiniteQuery(
    ["chat-messages", roomId],
    ({ pageParam = 0 }) =>
      roomId ? getChatMessages(roomId, pageParam, limit) : false,
    {
      getNextPageParam: (lastPage, allPages) => {
        const loadedMessagesCount = allPages.flatMap(
          (page) => page?.data?.listing
        ).length;

        // Check if there are still messages to load based on totalCount
        return loadedMessagesCount < lastPage?.data?.totalCount
          ? loadedMessagesCount
          : undefined;
      },

      select: (data) =>
        roomId
          ? data.pages
              .flatMap((page) => page?.data?.listing) // Flatten all messages from pages
              .reverse() // Reverse to display in ascending order (oldest to newest)
          : [],
      ...config,
    }
  );
};

// doctorId from  doctor table
export const useChatInbox = ({
  doctorId,
  search,
  config,
}: UseChatInboxOptions) => {
  return useQuery<ExtractFnReturnType<QueryInboxFnType>>({
    queryKey: ["chat-inbox", doctorId, search],
    queryFn: () => (doctorId ? getChatInbox(doctorId, search) : false),
    select: (data: { data: Address[] }) => data.data || [],
    ...config,
  });
};
