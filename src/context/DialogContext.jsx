import { dialogTypes } from "@/constants/constants";
import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [dialogType, setDialogType] = useState(dialogTypes.NODE);

  return (
    <DialogContext.Provider
      value={{
        open,
        setOpen,
        selectedNode,
        setSelectedNode,
        dialogType,
        setDialogType,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
