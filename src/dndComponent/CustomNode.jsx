import { useAppContext } from "@/App";
import useNodeFlow from "@/hooks/useNodeFlow";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { CircleDot, Play, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";

function CustomNode({ data, id, selected }) {
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
        <div
          style={{
            border: selected && "1px solid #4ade80",
          }}
          className="px-3 py-2 rounded-[6px] min-w-28 h-12 flex items-center gap-2 border border-gray-400 shadow-md hover:border-gray-600"
        >
          <span className="text-center w-full text-sm">
            {data?.label || "Node"}
          </span>
          <Handle
            type="target"
            position={Position.Left}
            className="!bg-emerald-500 !w-3 !h-3 border-white border-3"
          />
          <Handle
            type="source"
            id={`${id}-out-green`}
            position={Position.Right}
            className="!bg-emerald-500 !w-3 !h-3 border-3 border-white !top-[30%]"
          />
          <Handle
            type="source"
            id={`${id}-out-red`}
            position={Position.Right}
            className="!bg-red-500 !w-3 !h-3 border-3 border-white !top-[70%]"
          />
        </div>
      </div>
    </div>
  );
}
export default CustomNode;
