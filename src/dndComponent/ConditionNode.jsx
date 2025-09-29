import { useAppContext } from "@/App";
import useNodeFlow from "@/hooks/useNodeFlow";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { CircleDot, Play, Trash2 } from "lucide-react";
import React, { useCallback, useState } from "react";

function ConditionNode({ data, id, selected }) {
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
    <>
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
            className="py-2 rounded-[6px] min-w-36 min-h-12 flex flex-col items-center gap-2 border border-gray-400 shadow-md hover:border-gray-600"
          >
            <p className="text-center w-full text-[16px] h-8">
              {data?.label || "Node"}
            </p>
            {/* Condition */}
            {data?.conditions?.length > 0 &&
              data.conditions.map((condition) => (
                <div
                  key={condition.id}
                  className="relative flex items-center w-full rounded h-8 px-3"
                >
                  <p className="text-sm truncate max-w-[150px]">
                    {condition.label}
                  </p>

                  <Handle
                    type="source"
                    id={`${id}-out-${condition.id}`}
                    position={Position.Right}
                    className="!bg-emerald-500 !w-3 !h-3 border-2 border-white !absolute !top-1/2"
                  />
                </div>
              ))}
            <Handle
              type="target"
              position={Position.Left}
              className="!bg-emerald-500 !w-3 !h-3 border-white border-3"
            />
            {data?.conditions?.length !== 0 && (
              <>
                <div className="relative flex items-center justify-end w-full rounded h-8 px-3">
                  <p className="text-sm">Preventive</p>
                  <Handle
                    type="source"
                    id={`${id}-out-fallback`}
                    position={Position.Right}
                    className="!bg-orange-400 !w-3 !h-3 border-2 border-white !absolute !top-1/2"
                  />
                </div>

                <div className="relative flex items-center justify-end w-full rounded h-8 px-3">
                  <p className="text-sm">Next</p>
                  <Handle
                    type="source"
                    id={`${id}-out-next`}
                    position={Position.Right}
                    className="!bg-emerald-500 !w-3 !h-3 border-2 border-white !absolute !top-1/2"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ConditionNode;
