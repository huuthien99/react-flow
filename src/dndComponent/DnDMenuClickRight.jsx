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
  const { id, open, x, y } = openContextMenu;
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

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
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));

    setOpenContextMenu(null);
  }, [id, setNodes, setEdges]);

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
          <DropdownMenuItem onClick={duplicateNode}>
            Duplicate Node
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteNode}>Delete Node</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DnDMenuClickRight;
