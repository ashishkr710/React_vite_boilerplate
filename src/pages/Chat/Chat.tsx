import React, { useEffect, useMemo, useRef, useState } from "react";
import "./style.css";
import SendIcon from "@mui/icons-material/Send";
import { ChatMessage } from "@typing/global";
import {
  markRoomMessagesRead,
  useChatInbox,
  useChatMessages,
} from "../../API/Chat";
import { IconButton, Skeleton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContextProvider";
import { Clear as ClearIcon, Search as SearchIcon } from "@mui/icons-material";
import { socket } from "@utils/socket/socket";
import useDebounce from "@hooks/useDebounce";
import TimeAgo from "@components/Common/TimeAgo";
import { decryptData } from "@utils/EncryptDecrypt/EncryptDecrypt";

function Chat() {
  const {
    value: { user },
  } = useAppContext();
  const IsMD = user?.doctorType === "MD";
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const [roomData, setRoomData] = useState(state);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [chatInbox, setChatInbox] = useState([]);
  const [roomId, setRoomId] = useState<number>(null);
  const [scrolledTop, setScrolledTop] = useState<boolean>(false);
  const referedBy = roomData?.referedBy;
  const referedTo = roomData?.referedTo;
  const patientId = roomData?.patientId;
  const isSelected = referedBy && referedTo && patientId;
  const debouncedSearch = useDebounce(search, 500);
  const scrollIntervalId = useRef(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef(null);
  const chatDivRef = useRef(null);

  const joinChatRoom = (data: any) => {
    if (state) navigate(pathname, { replace: true });
    setRoomData(data);
    socket.emit("joinChatRoom", {
      referedBy: data?.referedBy,
      referedTo: data?.referedTo,
      patientId: data?.patientId,
      userId: user?.userId,
    });
  };

  const {
    isLoading: messagesLoding,
    isFetching: messagesFetching,
    fetchNextPage,
    hasNextPage,
  } = useChatMessages({
    roomId,
    limit: 8,
    config: {
      onSuccess: (data) => {
        setChat(data);
      },
    },
  });

  const {
    isLoading: inboxLoding,
    isFetching: inboxFetching,
    refetch: refetchInbox,
  } = useChatInbox({
    doctorId: user?.id, // doctorId from  doctor table
    search: debouncedSearch,
    config: {
      onSuccess: (data) => {
        setChatInbox(data);
        if (!roomData && data[0]) joinChatRoom(data[0]);
      },
    },
  });

  // Scroll to the bottom whenever the chat updates
  useEffect(() => {
    if (
      chatBottomRef.current &&
      !messagesLoding &&
      !messagesFetching &&
      !inboxLoding
    ) {
      if (scrolledTop) {
        setScrolledTop(false);
        chatDivRef.current.scroll(0, chatDivRef.current.clientHeight);
      } else {
        clearTimeout(scrollIntervalId.current);
        scrollIntervalId.current = setTimeout(() => {
          chatBottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [chat, messagesLoding, messagesFetching, inboxLoding]);

  useEffect(() => {
    // Join room when component mounts
    socket.on("roomJoined", (roomId) => {
      setRoomId(roomId);
      markRoomMessagesRead(roomId).then(() => refetchInbox());
      textAreaRef.current.focus();
    });

    // Listen for Chat Inbox
    socket.on("chatInbox-client", (chatInbox) => {
      setChatInbox(chatInbox);
    });

    return () => {
      socket.off("roomJoined");
      socket.off("chatInbox-client");
    };
  }, []);

  useEffect(() => {
    if (roomId) {
      // Listen for incoming messages
      socket.on(`chatMessage-${roomId}`, (msg) => {
        refetchInbox();
        setChat((prev) => [...prev, msg]);
      });

      return () => {
        socket.off(`chatMessage-${roomId}`);
      };
    } else {
      if (roomData) joinChatRoom(roomData);
    }
  }, [roomId]);

  const handleSendMessage = () => {
    if (isSelected && message.trim() !== "") {
      socket.emit("chatMessage", {
        userId: user?.userId,
        roomId,
        message,
        senderId: user.id,
        doctorUserId: user.userId,
        referedBy: roomData?.referedBy,
        referedTo: roomData?.referedTo,
        patientId: roomData?.patientId,
      }); // Emitting message with sender
      setMessage(""); // Clear the input field
    }
  };

  const randomGroups = useMemo(
    () => Array.from(new Array(5)).map(() => Math.random() < 0.5),
    []
  );

  // Scroll handler (e.g., triggered on reaching the top of the chat)
  const handleScroll = (e: any) => {
    if (e.target.scrollTop === 0 && hasNextPage) {
      fetchNextPage();
      setScrolledTop(true);
    }
  };

  return (
    <div className="outer-chat-wrap">
      <div className="chat-div">
        <div className="chat-heading">
          {debouncedSearch || inboxFetching || chatInbox.length > 0 ? (
            <div className="search-input-col">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search Patient"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <IconButton
                type="button"
                sx={{
                  p: "5.5px",
                  display: search.length > 0 ? "flex" : "none",
                }}
                aria-label="search"
                onClick={() => setSearch("")}
              >
                <ClearIcon />
              </IconButton>
            </div>
          ) : null}
        </div>
        <ChatInbox
          inboxLoding={inboxLoding}
          chatInbox={chatInbox}
          joinChatRoom={joinChatRoom}
          roomId={roomId}
          debouncedSearch={debouncedSearch}
        />
      </div>
      {isSelected ? (
        <div className="inner-chat-wrap">
          <ChatHeader
            patientName={decryptData(roomData?.patientName)}
            doctorName={roomData?.doctorName}
            IsMD={IsMD}
          />
          <div
            className="main-chat-div"
            onScroll={handleScroll}
            ref={chatDivRef}
          >
            {messagesLoding ? (
              Array.from(new Array(5)).map((_, index) => (
                <div
                  className={`${
                    randomGroups[index] ? "main-chat-content" : "main-chat-end"
                  } d-flex`}
                  key={index}
                >
                  <div
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    <Skeleton variant="text" width={400} height={40} />
                  </div>
                </div>
              ))
            ) : chat.length < 1 ? (
              <div className="no-chat">No chat available</div>
            ) : (
              chat.map((chatData, index) => {
                let className =
                  user?.id === chatData?.senderId
                    ? "main-chat-end d-flex"
                    : "main-chat-content d-flex";
                if (chatData?.senderId === chat[index - 1]?.senderId) {
                  className += " main-chat-para";
                }
                return (
                  <div className={className} key={index}>
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {chatData?.message}
                      <small className="time-ago">
                        <TimeAgo timestamp={chatData?.updatedAt} />
                      </small>
                    </p>
                  </div>
                );
              })
            )}
            <span ref={chatBottomRef} className="chat-bottom">
              .
            </span>
          </div>
          <div className="sent-box">
            <div className="share-img-div">
              <div className="share-input">
                <textarea
                  ref={textAreaRef}
                  placeholder="Type your message here..."
                  autoFocus
                  className="sent-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)} // Fixing onChange
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault(); // Prevents adding a new line
                      handleSendMessage(); // Calls the function to send the message
                    }
                  }}
                />
                <SendIcon className="send-icon" onClick={handleSendMessage} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-patient-selected">
          No Patient selected, please select any patient!
        </div>
      )}
    </div>
  );
}

// Chat message component for reuse
const ChatMessageItem = ({
  chatData,
  currentRoomId,
  handleRoomChange,
}: {
  chatData: any;
  currentRoomId: number;
  handleRoomChange: (data: any) => void;
}) => {
  const isActive = chatData?.id === currentRoomId;
  return (
    <div
      className={`chat-room ${isActive ? "active" : ""}`}
      onClick={() => handleRoomChange(chatData)}
    >
      <div className="inner-text-chat d-flex">
        <div className="chat-name">
          <h4>{decryptData(chatData?.patientName)}</h4>
          <p>{chatData?.doctorName}</p>
        </div>
        <div
          className="inbox-badge"
          style={{
            display: chatData.unReadCount > 0 ? "block" : "none",
          }}
        >
          {chatData.unReadCount}
        </div>
      </div>
      {/*<p className="chat-date">
                <TimeAgo timestamp={chatData?.updatedAt} />
            </p>*/}
    </div>
  );
};

// Chat header component for reuse
const ChatHeader = ({
  patientName,
  doctorName,
  IsMD,
}: {
  patientName: string;
  doctorName: string;
  IsMD: boolean;
}) => {
  return (
    <div className="inner-chat-heading">
      <div className="inner-text-chat d-flex">
        <div className="inner-chat-name">
          <h4>{patientName}</h4>
          <p>
            Refered {IsMD ? "by" : "to"}: <b>{doctorName}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

const ChatInbox = ({
  inboxLoding,
  chatInbox,
  joinChatRoom,
  roomId,
  debouncedSearch,
}: {
  inboxLoding: boolean;
  chatInbox: any[];
  joinChatRoom: (data: any) => void;
  roomId: number;
  debouncedSearch: string;
}) => {
  return (
    <div className="main-inner-chat">
      {inboxLoding ? (
        Array.from(new Array(5)).map((_, index) => (
          <div key={index}>
            <Skeleton variant="text" height={60} />
          </div>
        ))
      ) : chatInbox.length < 1 ? (
        <div className="no-inbox">
          <p>
            {debouncedSearch
              ? "No patient found!"
              : "You haven't chat with anyone yet!"}
          </p>
        </div>
      ) : (
        chatInbox.map((chatData, index) => (
          <ChatMessageItem
            key={index}
            chatData={chatData}
            handleRoomChange={joinChatRoom}
            currentRoomId={roomId}
          />
        ))
      )}
    </div>
  );
};

export default Chat;
