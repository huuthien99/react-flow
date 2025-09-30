import { Handle, Position } from "@xyflow/react";
import NodeCommon from "./NodeCommon";

function ConditionNode({ data, id, selected }) {
  return (
    <NodeCommon data={data} id={id} selected={selected}>
      <div
        style={{
          border: selected && "1px solid #4ade80",
        }}
        className="py-2 rounded-[6px] min-w-36 min-h-12 flex flex-col items-center gap-2 border border-gray-400 shadow-md hover:border-gray-600"
      >
        <p className="text-center w-full text-[16px] h-8">
          {data?.label || "Node"}
        </p>
        {/* Target */}
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-emerald-500 !w-3 !h-3 border-white border-3"
        />

        {/* Condition */}
        {data?.branches?.length > 0 &&
          data.branches.map((condition) => (
            <div
              key={condition.id}
              className="relative flex items-center w-full rounded h-8 px-3"
            >
              <p className="text-sm truncate max-w-[150px]">
                {condition.label}
              </p>

              <Handle
                type="source"
                id={`${condition.id}-out-green-condition`}
                position={Position.Right}
                className="!bg-emerald-500 !w-3 !h-3 border-2 border-white !absolute !top-1/2"
              />
            </div>
          ))}

        {data?.branches?.length !== 0 && (
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
                id={`${id}-out-green-next`}
                position={Position.Right}
                className="!bg-emerald-500 !w-3 !h-3 border-2 border-white !absolute !top-1/2"
              />
            </div>
          </>
        )}
      </div>
    </NodeCommon>
  );
}

export default ConditionNode;
