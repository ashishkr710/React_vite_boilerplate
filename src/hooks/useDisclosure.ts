import * as React from "react";

export const useModalDisclosure = (initial = false) => {
  const [isOpen, setIsOpen] = React.useState(initial);
  const [data, setData] = React.useState<any>(false);

  const open = React.useCallback((data?: any) => {
    setIsOpen(true);
    setData(data);
  }, []);
  const close = React.useCallback(() => {
    setIsOpen(false);
    setData(false);
  }, []);
  const toggle = React.useCallback((data?: any) => {
    setIsOpen((state) => !state);
    setData(data || false);
  }, []);

  return { isOpen, data, open, close, toggle, setData };
};
