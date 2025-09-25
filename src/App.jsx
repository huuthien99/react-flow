import { ReactFlowProvider } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { DnDProvider } from "./context/DnDContext";
import { DialogProvider } from "./context/DialogContext";
import DnDContainer from "./dndComponent/DnDContainer";
import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppOptions } from "./constants/constants";
import { useEffect } from "react";

const AppContext = createContext();

function App() {
  const [options, setOptions] = useState(() => {
    const saved = localStorage.getItem("appOptions");
    return saved
      ? JSON.parse(saved)
      : {
          animated: AppOptions.IS_ANIMATED_EDGE,
          isAutoSave: AppOptions.IS_AUTO_SAVE,
          isDebugMode: AppOptions.IS_DEBUG_MODE,
        };
  });

  useEffect(() => {
    const prev = localStorage.getItem("appOptions");
    const next = JSON.stringify(options);
    if (prev !== next) {
      localStorage.setItem("appOptions", next);
    }
  }, [options]);

  return (
    <AppContext.Provider value={[options, setOptions]}>
      <ReactFlowProvider>
        <DnDProvider>
          <DialogProvider>
            <DnDContainer />
          </DialogProvider>
        </DnDProvider>
      </ReactFlowProvider>
    </AppContext.Provider>
  );
}

export default App;

export const useAppContext = () => {
  return useContext(AppContext);
};
