import * as React from "react";

export const useLoading = (initial = false) => {
  const [isLoading, setIsLoading] = React.useState(initial);

  const handleLoading = React.useCallback(
    (val: boolean) => setIsLoading(val),
    []
  );

  return { isLoading, handleLoading };
};
