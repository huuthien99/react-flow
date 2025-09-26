import { Handle, Position } from "@xyflow/react";

function StartNode({ data }) {
  return (
    <div
      className={`flex items-center justify-center w-20 h-20 rounded-full !bg-emerald-500 shadow-md relative text-white text-sm`}
    >
      {data.label || "Bắt đầu"}
      <Handle
        type="source"
        position={Position.Right}
        className={`!bg-emerald-500 !w-3 !h-3 border-3 border-white "`}
      />
    </div>
  );
}

export default StartNode;
