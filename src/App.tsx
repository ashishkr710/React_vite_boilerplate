import React, { Suspense } from "react";

import AppContextProvider from "./contexts/AppContextProvider";
import { QueryClientProvider } from "react-query";
import AppRoutes from "./Routes";
import { queryClient } from "./lib/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FullPageSpinner } from "@components/Common/Spinner/FullPageSpinner";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
//import { ReactQueryDevtools } from 'react-query/devtools';

const App = () => {
  const AppContent = (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<FullPageSpinner />}>
        <AppContextProvider>
          <Router>
            <AppRoutes />
          </Router>
          {/*<ReactQueryDevtools />*/}
          <ToastContainer />
        </AppContextProvider>
      </Suspense>
    </QueryClientProvider>
  );

  return (
    //process.env.NODE_ENV === 'development' ? (
    <React.StrictMode>{AppContent}</React.StrictMode>
    //) : (
    //  AppContent
    //)
  );
};

export default App;
