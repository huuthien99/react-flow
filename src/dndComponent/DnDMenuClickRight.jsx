import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

function DnDMenuClickRight({ openContextMenu, setOpenContextMenu }) {
  if (!openContextMenu) return null;

  const { id, open, x, y, ids = [], type = "single" } = openContextMenu;
  const { getNode, setNodes, addNodes, setEdges, getEdge } = useReactFlow();

  const duplicateNode = useCallback(() => {
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

    setOpenContextMenu(null);
  }, [id]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));

    setOpenContextMenu(null);
  }, [id]);

  const handleMultiDelete = useCallback(() => {
    setNodes((nds) => nds.filter((n) => !ids.includes(n.id)));

    setEdges((eds) =>
      eds.filter((e) => !ids.includes(e.source) && !ids.includes(e.target))
    );

    setOpenContextMenu(null);
  }, [ids]);

  const duplicateMultipleNodesWithEdges = useCallback(() => {
    if (!ids.length) return;

    const newIdMap = {};
    const selectedNodes = ids.map(getNode).filter(Boolean);
    if (!selectedNodes.length) return;

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

    setOpenContextMenu(null);
  }, [ids]);
  return (
    <div>
      <DropdownMenu
        open={open}
        onOpenChange={(open) => setOpenContextMenu((m) => m && { ...m, open })}
      >
        <DropdownMenuTrigger asChild>
          <div
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 1,
              height: 1,
            }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40"
          side="right"
          align="start"
          sideOffset={4}
        >
          {type === "multi" ? (
            <>
              <DropdownMenuItem onClick={duplicateMultipleNodesWithEdges}>
                Duplicate Node
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleMultiDelete}>
                Delete Node
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={duplicateNode}>
                Duplicate Node
              </DropdownMenuItem>
              <DropdownMenuItem onClick={deleteNode}>
                Delete Node
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DnDMenuClickRight;
