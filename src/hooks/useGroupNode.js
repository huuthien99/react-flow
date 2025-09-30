import { replaceSourceHandle } from "@/constants/helper";
import { getNodesBounds, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
const GROUP_PADDING = 10;
const GROUP_HEADER_H = 0;

function useGroupNode() {
  const { setNodes, getNodes, setEdges } = useReactFlow();

  const groupSelectedNodes = useCallback(
    (ids = []) => {
      if (!ids.length) return;

      const newGroupNodeId = uuidv4();
      const allNodes = getNodes();

      const selectedNodes = allNodes.filter((n) => ids.includes(n.id));

      if (!selectedNodes.length) return;

      const rect = getNodesBounds(selectedNodes);

      const groupPosition = {
        x: rect.x - GROUP_PADDING,
        y: rect.y - GROUP_PADDING - GROUP_HEADER_H,
      };

      const groupSize = {
        width: rect.width + GROUP_PADDING * 2,
        height: rect.height + GROUP_PADDING * 2 + GROUP_HEADER_H,
      };

      const newGroupNode = {
        id: newGroupNodeId,
        type: "group",
        position: groupPosition,
        data: { label: null },
        style: { width: groupSize.width, height: groupSize.height },
      };

      const updatedNodes = allNodes.map((node) =>
        ids.some((id) => id === node.id)
          ? {
              ...node,
              parentId: newGroupNodeId,
              extent: "parent",

              position: {
                x: node.position.x - groupPosition.x,
                y: node.position.y - groupPosition.y,
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

  const unGroup = useCallback(
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
  const deleteGroupWithChildren = useCallback(
    (groupId) => {
      setNodes((nodes) => {
        const childrenIds = nodes
          .filter((n) => n.parentId === groupId)
          .map((n) => n.id);

        const idsToDelete = [groupId, ...childrenIds];

        return nodes.filter((n) => !idsToDelete.includes(n.id));
      });

      setEdges((edges) =>
        edges
          .filter((e) => e.source !== groupId && e.target !== groupId)
          .filter(
            (e) =>
              !getNodes().some(
                (n) =>
                  n.parentId === groupId &&
                  (e.source === n.id || e.target === n.id)
              )
          )
      );
    },
    [setNodes, setEdges, getNodes]
  );

  const duplicateGroup = useCallback(
    (groupId) => {
      const allNodes = getNodes();
      const groupNode = allNodes.find((n) => n.id === groupId);
      if (!groupNode) return;

      const children = allNodes.filter((n) => n.parentId === groupId);

      const newGroupId = uuidv4();

      const newGroupNode = {
        ...groupNode,
        id: newGroupId,
        position: {
          x: groupNode.position.x + 50,
          y: groupNode.position.y + 100,
        },
        selected: false,
      };

      const newIdMap = {};

      newIdMap[groupId] = newGroupId;

      const newChildren = children.map((child) => {
        const newId = uuidv4();
        newIdMap[child.id] = newId;

        const newBranches =
          child.data?.branches?.map((c) => {
            const newCondId = uuidv4();
            newIdMap[c.id] = newCondId;
            return { ...c, id: newCondId };
          }) || [];

        return {
          ...child,
          id: newId,
          parentId: newGroupId,
          position: {
            x: child.position.x,
            y: child.position.y,
          },
          data: { ...child.data, branches: newBranches },
        };
      });

      setEdges((eds) => {
        const relatedIds = [groupId, ...children.map((c) => c.id)];
        const newEdges = eds
          .filter(
            (e) =>
              relatedIds.includes(e.source) || relatedIds.includes(e.target)
          )
          .map((e) => {
            const newSourceHandle = replaceSourceHandle(e, newIdMap);
            return {
              ...e,
              id: uuidv4(),
              source: newIdMap[e.source] || e.source,
              target: newIdMap[e.target] || e.target,
              sourceHandle: newSourceHandle,
            };
          });

        return [...eds, ...newEdges];
      });

      setNodes((nds) => [...nds, newGroupNode, ...newChildren]);
    },
    [getNodes, setNodes, setEdges]
  );
  return {
    groupSelectedNodes,
    deleteGroupWithChildren,
    unGroup,
    duplicateGroup,
  };
}

export default useGroupNode;
