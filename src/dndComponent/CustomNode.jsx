import { Color_line, typeNodes } from "@/constants/constants";
import { Handle, Position } from "@xyflow/react";

function CustomNode({ data, keyWord, id }) {
  const config = typeNodes[keyWord];

  return (
    <div className="px-3 py-2 rounded-[6px] min-w-28 h-12 flex items-center gap-2 border border-gray-800">
      <span className="text-center w-full text-sm">
        {data?.label || "Node"}
      </span>

      <Handle
        type="target"
        position={Position.Left}
        className={`!bg-${Color_line.GREEN} !w-3 !h-3  border-white border-3`}
      />

      <Handle
        type="source"
        id={`${id}-out-green`}
        position={Position.Right}
        className={`!bg-${Color_line.GREEN} !w-3 !h-3 border-3 border-white !top-[30%]`}
      />
      <Handle
        type="source"
        id={`${id}-out-red`}
        position={Position.Right}
        className={`!bg-${Color_line.RED} !w-3 !h-3 border-3 border-white !top-[70%]`}
      />
    </div>
  );
}

export default CustomNode;
