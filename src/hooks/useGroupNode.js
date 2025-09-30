import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

function useGroupNode() {
  const { setNodes, getNodes } = useReactFlow();

  const groupSelectedNodes = useCallback(
    (ids = []) => {
      if (!ids.length) return;

      const newGroupNodeId = uuidv4();
      const allNodes = getNodes();

      const selectedNodes = allNodes.filter((n) => ids.includes(n.id));

      const minX = Math.min(...selectedNodes.map((n) => n.position.x));
      const minY = Math.min(...selectedNodes.map((n) => n.position.y));
      const maxX = Math.max(
        ...selectedNodes.map((n) => n.position.x + (n.width || 100))
      );
      const maxY = Math.max(
        ...selectedNodes.map((n) => n.position.y + (n.height || 50))
      );
      const padding = 20;
      const groupX = minX - padding / 2;
      const groupY = minY - padding / 2;

      const width = maxX - minX + padding;
      const height = maxY - minY + padding;

      const newGroupNode = {
        id: newGroupNodeId,
        type: "group",
        position: { x: minX, y: minY },
        data: { label: null },
        style: { width: width, height: height },
      };

      const updatedNodes = allNodes.map((node) =>
        ids.some((id) => id === node.id)
          ? {
              ...node,
              parentId: newGroupNodeId,
              extent: "parent",
              position: {
                x: node.position.x - groupX,
                y: node.position.y - groupY,
              },
              selected: false,
              draggable: false,
            }
          : node
      );

      setNodes([newGroupNode, ...updatedNodes]);
    },
    [setNodes, getNodes]
  );
  const deleteGroup = useCallback(
    (groupId) => {
      setNodes((nodes) => {
        const groupNode = nodes.find((n) => n.id === groupId);
        if (!groupNode) return nodes;

        return nodes
          .filter((n) => n.id !== groupId) // xoá group node
          .map((n) =>
            n.parentId === groupId
              ? {
                  ...n,
                  parentId: undefined,
                  extent: undefined,
                  draggable: true,
                  // convert position relative -> absolute
                  position: {
                    x: n.position.x + groupNode.position.x,
                    y: n.position.y + groupNode.position.y,
                  },
                }
              : n
          );
      });
    },
    [setNodes]
  );
  return { groupSelectedNodes, deleteGroup };
}

export default useGroupNode;
