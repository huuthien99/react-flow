import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDialog } from "@/context/DialogContext";
import { useReactFlow } from "@xyflow/react";
import { ArrowLeft, EllipsisVertical, Plus } from "lucide-react";

import { dialogTypes } from "@/constants/constants";
import DialogSettings from "./DialogSettings";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";

function Header({ procedure, handleDelete, handleAddNew, selectedId }) {
  const { getNodes, getEdges } = useReactFlow();

  const { setOpen, setDialogType } = useDialog();

  const handleSave = () => {
    const nodes = getNodes();
    const edges = getEdges();
    localStorage.setItem("reactFlowNodes", JSON.stringify(nodes));
    localStorage.setItem("reactFlowEdges", JSON.stringify(edges));
  };

  const navigate = useNavigate();

  return (
    <div
      className="
        flex-1 h-16 flex items-center justify-between
        border-b px-5 overflow-hidden
      "
      style={{ maxWidth: "100%" }}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Button onClick={() => navigate("/procedure")} variant={"outline"}>
          <ArrowLeft />
          Back
        </Button>
        <div
          className="
            flex gap-2 items-center
            max-w-[80%] 
            overflow-x-auto overflow-y-hidden
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
            whitespace-nowrap
          "
        >
          {procedure?.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-1 p-1 border rounded-[6px] cursor-pointer",
                selectedId === item.id && "rounded-xl border-2"
              )}
            >
              {item?.name}
              <Button
                variant={"outline"}
                size="icon"
                className="h-5 w-5 border-0 rounded-[50%] hover:bo"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item);
                }}
              >
                x
              </Button>
            </div>
          ))}
        </div>
        <Button
          onClick={handleAddNew}
          variant="outline"
          size="icon"
          className="h-8 w-8"
        >
          <Plus />
        </Button>
      </div>
      <div className="flex items-center gap-2">
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
    </div>
  );
}

export default Header;
