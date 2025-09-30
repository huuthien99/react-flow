import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGroupNode from "@/hooks/useGroupNode";
import useNodeFlow from "@/hooks/useNodeFlow";

function DnDMenuClickRight({ openContextMenu, setOpenContextMenu }) {
  if (!openContextMenu) return null;

  const {
    id,
    open,
    x,
    y,
    ids = [],
    type = "single",
    isGroup = false,
  } = openContextMenu;

  const {
    groupSelectedNodes,
    deleteGroupWithChildren,
    unGroup,
    duplicateGroup,
  } = useGroupNode();

  const {
    deleteNode,
    duplicateNode,
    duplicateMultipleNodesWithEdges,
    handleMultiDelete,
  } = useNodeFlow();

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={() => setOpenContextMenu(null)}>
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
              <DropdownMenuItem
                onClick={() => duplicateMultipleNodesWithEdges(ids, y)}
              >
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMultiDelete(ids)}>
                Delete
              </DropdownMenuItem>

              {!isGroup && (
                <DropdownMenuItem onClick={() => groupSelectedNodes(ids)}>
                  Group
                </DropdownMenuItem>
              )}
            </>
          ) : (
            <>
              {isGroup ? (
                <>
                  <DropdownMenuItem onClick={() => duplicateGroup(id)}>
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      unGroup(id);
                    }}
                  >
                    UnGroup
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteGroupWithChildren(id)}>
                    Delete
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => duplicateNode(id)}>
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteNode(id)}>
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DnDMenuClickRight;
