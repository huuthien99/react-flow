import { useAppContext } from "@/App";
import useNodeFlow from "@/hooks/useNodeFlow";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { CircleDot, Play, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";

function NodeCommon({ data, id, children }) {
  const { updateNodeData } = useReactFlow();

  const [options] = useAppContext();
  const [showToolbar, setShowToolbar] = useState(false);

  const { deleteNode } = useNodeFlow();

  const handleDeleteNode = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const handleSetPointDebug = useCallback(
    (e) => {
      e.stopPropagation();
      updateNodeData(id, { isSelectedPointDebug: !data.isSelectedPointDebug });
    },
    [data.isSelectedPointDebug, id, updateNodeData]
  );

  return (
    <div
      onMouseEnter={() => setShowToolbar(true)}
      onMouseLeave={() => setShowToolbar(false)}
      className="p-4"
    >
      <div className="relative">
        {options.isDebugMode && (
          <div className="absolute -top-5 left-0">
            <CircleDot
              onClick={handleSetPointDebug}
              size={14}
              className={`cursor-pointer ${
                data.isSelectedPointDebug ? "text-red-500" : ""
              }`}
            />
          </div>
        )}

        {showToolbar && (
          <div className="absolute -top-5 right-1 flex gap-1">
            <Trash2
              size={14}
              className="cursor-pointer hover:text-red-500"
              onClick={handleDeleteNode}
            />
            <Play
              size={14}
              className="cursor-pointer hover:text-emerald-500"
              onClick={() => console.log("Run", id)}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
export default NodeCommon;
