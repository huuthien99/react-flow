import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";

import React from "react";

function useNodeFlow() {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

  const duplicateNode = useCallback(
    (id) => {
      const node = getNode(id);

      const position = {
        x: node.position.x + 50 + Math.random() * 50,
        y: node.position.y + 50 + Math.random() * 50,
      };

      addNodes({
        ...node,
        selected: false,
        dragging: false,
        id: uuidv4(),
        position,
        data: { ...node.data },
      });
    },
    [getNode, addNodes]
  );

  const deleteNode = useCallback(
    (id) => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      setEdges((edges) => edges.filter((edge) => edge.source !== id));
    },
    [setNodes, setEdges]
  );

  const handleMultiDelete = useCallback(
    (ids = []) => {
      setNodes((nds) => nds.filter((n) => !ids.includes(n.id)));

      setEdges((eds) =>
        eds.filter((e) => !ids.includes(e.source) && !ids.includes(e.target))
      );
    },
    [setEdges, setNodes]
  );

  const duplicateMultipleNodesWithEdges = useCallback(
    (ids = [], y) => {
      if (!ids.length) return;

      const newIdMap = {};
      const selectedNodes = ids.map(getNode).filter(Boolean);

      // Duplicate nodes
      const newNodes = selectedNodes.map((node) => {
        const newId = uuidv4();
        newIdMap[node.id] = newId;
        return {
          ...node,
          id: newId,
          position: {
            x: node.position.x + 50,
            y: node.position.y + 50 + y / 5,
          },
          selected: true,
          dragging: false,
          data: { ...node.data },
        };
      });

      addNodes(newNodes);

      setEdges((prevEdges) => {
        const newEdges = prevEdges
          .filter((e) => ids.includes(e.source) && ids.includes(e.target))
          .map((e) => {
            return {
              ...e,
              id: uuidv4(),
              source: newIdMap[e.source],
              target: newIdMap[e.target],
              sourceHandle: e.sourceHandle.includes("out-green")
                ? `${newIdMap[e.source]}-out-green`
                : `${newIdMap[e.source]}-out-red`,
              targetHandle: e.targetHandle,
            };
          });
        return [...prevEdges, ...newEdges];
      });

      setNodes((nds) =>
        nds.map((n) => (ids.includes(n.id) ? { ...n, selected: false } : n))
      );
    },
    [setEdges, setNodes, getNode, addNodes]
  );

  return {
    duplicateNode,
    deleteNode,
    handleMultiDelete,
    duplicateMultipleNodesWithEdges,
  };
}

export default useNodeFlow;
