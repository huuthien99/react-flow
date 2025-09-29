import { Handle, Position } from "@xyflow/react";
import NodeCommon from "./NodeCommon";

function NodeDefault({ data, id, selected }) {
  return (
    <NodeCommon data={data} id={id} selected={selected}>
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
    </NodeCommon>
  );
}
export default NodeDefault;
