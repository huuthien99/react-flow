import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
  const { deleteElements } = useReactFlow();

  return (
    <>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="#333" />
        </marker>
      </defs>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          strokeWidth: 1,
          stroke: "#555",
          ...style,
        }}
        markerEnd="url(#arrowhead)"
      />

      <EdgeLabelRenderer>
        <span
          className="edge-delete-btn"
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
            cursor: "pointer",
            background: "red",
            color: "#fff",
            borderRadius: "50%",
            width: 18,
            height: 18,
            textAlign: "center",
            lineHeight: "18px",
            opacity: 0,
            transition: "opacity 0.2s",
          }}
          onClick={() => deleteElements({ edges: [{ id }] })}
        >
          ✕
        </span>
      </EdgeLabelRenderer>
    </>
  );
}

export default CustomEdge;
