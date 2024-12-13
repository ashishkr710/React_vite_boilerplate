import { User } from "@typing/global";
import storage from "@utils/storage";
import React, { useState, createContext, useContext } from "react";
import { getUser } from "../API/User";
import { FullPageSpinner } from "@components/Common/Spinner/FullPageSpinner";
import { useLoading } from "@hooks/useLoading";
import { socket } from "@utils/socket/socket";
import { queryClient } from "../lib/react-query";
import { logout } from "../API/Auth";

export type AppContextValueData = {
  darkMode: boolean;
  isUser: boolean;
  user: User;
};

type AppContextValue = {
  value: AppContextValueData;
  setValue: (prev: any) => void;
  handleLoading: (val: boolean) => void;
};

type AppContextProviderProps = {
  children?: React.ReactNode;
};

export const AppContext = createContext<AppContextValue>(null);

export const useAppContext = () => useContext(AppContext);

const intialContextValue: AppContextValueData = {
  darkMode: false,
  isUser: false,
  user: null,
};

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}: AppContextProviderProps) => {
  const [value, setValue] = useState<AppContextValueData>(intialContextValue);
  const { isLoading, handleLoading } = useLoading();
  const init = async () => {
    const contextValue: AppContextValueData = {
      darkMode: false,
      isUser: false,
      user: null,
    };
    const token = storage.getToken();
    if (token) {
      const user = storage.getUser();
      contextValue.isUser = true;
      contextValue.user = user;
      setValue(contextValue);
      if (user.userType === "doctor") {
        getUser().then((res: any) => {
          setValue((prev) => ({
            ...prev,
            user: res?.data?.data?.user,
          }));
        });
      }
    }
  };

  const handleStorageChange = (event: any) => {
    if (event.key === "eye_refer_user") {
      setValue((prev) => ({
        ...prev,
        user: event.newValue ? JSON.parse(event.newValue) : null,
      }));
    } else if (event.key === "eye_refer_token") {
      setValue((prev) => ({
        ...prev,
        isUser: !!event.newValue,
      }));
      if (event.newValue) {
        queryClient.invalidateQueries();
        window.location.href = "/app/dashboard";
      } else {
        logout();
      }
    }
    // Detect localStorage.clear() on logout
    else if (event.key === null && event.newValue === null) {
      setValue(intialContextValue); // Clear user data on all tabs
    }
  };

  React.useEffect(() => {
    init();
    // Sync across tabs
    window.addEventListener("storage", handleStorageChange);

    const user = storage.getUser();
    if (storage.getToken() && user?.userType === "doctor") {
      socket.connect();
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      socket.disconnect();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        value,
        setValue,
        handleLoading,
      }}
    >
      {isLoading ? (
        <FullPageSpinner
          style={{
            backgroundColor: "rgb(0 0 0 / 20%)",
            color: "#fff",
          }}
        />
      ) : null}
      {value ? children : null}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
