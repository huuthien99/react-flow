import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";

function CustomEdge(props) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    sourceHandleId,
    style = {},
  } = props;
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });
  const { deleteElements } = useReactFlow();

  const colorLine = !sourceHandleId
    ? "green"
    : sourceHandleId.includes("red")
    ? "red"
    : sourceHandleId.includes("green")
    ? "green"
    : "orange";

  const handleDeleteEdge = () => {
    deleteElements({ edges: [{ id }] });
  };

  return (
    <>
      <defs>
        <marker
          id={`arrowhead-${colorLine}`}
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={colorLine} />
        </marker>
      </defs>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          strokeWidth: 1,
          stroke: colorLine,
          ...style,
        }}
        markerEnd={`url(#arrowhead-${colorLine})`}
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
            zIndex: 2,
          }}
          onClick={handleDeleteEdge}
        >
          ✕
        </span>
      </EdgeLabelRenderer>
    </>
  );
}

export default CustomEdge;
