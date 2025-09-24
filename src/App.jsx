import { ReactFlowProvider } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { DnDProvider } from "./context/DnDContext";
import { DialogProvider } from "./context/DialogContext";
import DnDContainer from "./dndComponent/DnDContainer";

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DialogProvider>
        <DnDContainer />
      </DialogProvider>
    </DnDProvider>
  </ReactFlowProvider>
);
