import { createContext, useContext, useState } from "react";

const DialogContext = createContext([false, () => {}, null, () => {}]);

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  return (
    <DialogContext.Provider
      value={[open, setOpen, selectedNode, setSelectedNode]}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
