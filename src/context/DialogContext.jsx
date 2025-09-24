import React, { createContext, useContext, useState } from "react";

const DialogContext = createContext([false, (_) => {}, null, (_) => {}]);

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  console.log("🚀 ~ DialogProvider ~ open:", open);
  const [selectedNode, setSelectedNode] = useState(null);
  console.log("🚀 ~ DialogProvider ~ selectedNode:", selectedNode);
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
