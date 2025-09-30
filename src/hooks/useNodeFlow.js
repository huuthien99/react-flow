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
    (ids = [], y = 0) => {
      if (!ids.length) return;

      const newIdMap = {};
      const selectedNodes = ids.map(getNode).filter(Boolean);

      // Duplicate nodes + branches
      const newNodes = selectedNodes.map((node) => {
        const newId = uuidv4();
        newIdMap[node.id] = newId;

        const newBranches =
          node.data?.branches?.map((c) => {
            const newCondId = uuidv4();
            newIdMap[c.id] = newCondId;
            return { ...c, id: newCondId };
          }) || [];

        return {
          ...node,
          id: newId,
          position: {
            x: node.position.x + 50,
            y: node.position.y + 50 + y / 5,
          },
          selected: true,
          dragging: false,
          data: { ...node.data, branches: newBranches },
        };
      });

      addNodes(newNodes);

      // Duplicate edges
      setEdges((prevEdges) => {
        const newEdges = prevEdges
          .filter((e) => ids.includes(e.source) && ids.includes(e.target))
          .map((e) => {
            let newSourceHandle = e.sourceHandle;

            if (e.sourceHandle?.includes("out-green-condition")) {
              const oldConditionId = e.sourceHandle.split(
                "-out-green-condition"
              )[0];
              const newConditionId = newIdMap[oldConditionId];
              newSourceHandle = `${newConditionId}-out-green-condition`;
            } else if (e.sourceHandle?.includes("out-fallback")) {
              newSourceHandle = `${newIdMap[e.source]}-out-fallback`;
            } else if (e.sourceHandle?.includes("out-green-next")) {
              newSourceHandle = `${newIdMap[e.source]}-out-green-next`;
            } else if (e.sourceHandle?.includes("out-green")) {
              newSourceHandle = `${newIdMap[e.source]}-out-green`;
            } else if (e.sourceHandle?.includes("out-red")) {
              newSourceHandle = `${newIdMap[e.source]}-out-red`;
            }

            return {
              ...e,
              id: uuidv4(),
              source: newIdMap[e.source],
              target: newIdMap[e.target],
              sourceHandle: newSourceHandle,
            };
          });

        return [...prevEdges, ...newEdges];
      });

      setNodes((nds) =>
        nds.map((n) => (ids.includes(n.id) ? { ...n, selected: false } : n))
      );
    },
    [getNode, addNodes, setNodes, setEdges]
  );

  return {
    duplicateNode,
    deleteNode,
    handleMultiDelete,
    duplicateMultipleNodesWithEdges,
  };
}

export default useNodeFlow;
