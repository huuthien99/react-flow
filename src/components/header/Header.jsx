import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialog } from "@/context/DialogContext";
import { useReactFlow } from "@xyflow/react";
import { EllipsisVertical } from "lucide-react";

import { dialogTypes } from "@/constants/constants";
import DialogSettings from "./DialogSettings";

function Header() {
  const { getNodes, getEdges } = useReactFlow();

  const { setOpen, setDialogType } = useDialog();

  const handleSave = () => {
    const nodes = getNodes();
    const edges = getEdges();
    localStorage.setItem("reactFlowNodes", JSON.stringify(nodes));
    localStorage.setItem("reactFlowEdges", JSON.stringify(edges));
  };

  return (
    <div className="w-full h-16 flex items-center gap-4 justify-end border-b px-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setDialogType(dialogTypes.SETTINGS);
              setOpen(true);
            }}
          >
            settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogSettings />

      <Button
        onClick={handleSave}
        className="bg-blue-100 text-black hover:bg-blue-200"
      >
        Lưu lại
      </Button>
    </div>
  );
}

export default Header;
