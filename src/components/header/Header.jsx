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
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import DialogSettings from "./DialogSettings";
import FloatingLabelInput from "@/common/FloatingLabelInput";
import FloatingLabelTextarea from "@/common/FloatingLabelTextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function Header({
  procedure,
  handleDelete,
  handleAddNewTab,
  selectedId,
  handleSelect,
  handleAddProcedure,
  handleUpdate,
}) {
  const { getNodes, getEdges } = useReactFlow();

  const { setOpen, setDialogType } = useDialog();
  const [openDelete, setOpenDelete] = useState({ open: false, data: null });
  const { pathname } = useLocation();

  const handleSave = () => {
    if (handleUpdate) {
      const nodes = getNodes();
      const edges = getEdges();

      const data = {
        nodes,
        edges,
      };
      handleUpdate(data);
    }
    // localStorage.setItem("reactFlowNodes", JSON.stringify(nodes));
    // localStorage.setItem("reactFlowEdges", JSON.stringify(edges));
  };

  const navigate = useNavigate();
  const [openCreate, setOpenCreate] = useState(false);
  const [value, setValue] = useState(() => {
    return {
      name: "",
      description: "",
      group: "ungrouped",
    };
  });

  const onDelete = () => {
    if (handleDelete) handleDelete(openDelete.data);
    setOpenDelete({ open: false, data: null });
  };

  const handleChange = (value, key) => {
    setValue((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const onSave = () => {
    const nodes = getNodes();
    const edges = getEdges();
    const data = {
      ...value,
      nodes,
      edges,
    };
    if (handleAddProcedure) handleAddProcedure(data);
    setOpenCreate(false);
    setValue({ name: "", description: "", group: "ungrouped" });
  };

  return (
    <>
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
                onClick={() => handleSelect(item)}
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
                    setOpenDelete({ open: true, data: item });
                  }}
                >
                  x
                </Button>
              </div>
            ))}
          </div>
          {/* <Button
            onClick={handleAddNewTab}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Plus />
          </Button> */}
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
          {pathname === "/procedure/new" ? (
            <Button
              onClick={() => setOpenCreate(true)}
              className="bg-blue-100 text-black hover:bg-blue-200"
            >
              Create
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              className="bg-blue-100 text-black hover:bg-blue-200"
            >
              Save
            </Button>
          )}
        </div>
      </div>

      <Dialog open={openDelete?.open} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <div className="flex gap-2 justify-end">
              <Button
                onClick={() => setOpenDelete({ data: null, open: false })}
                variant={"outline"}
              >
                Back
              </Button>
              <Button onClick={() => onDelete()} variant="destructive">
                Delete
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Procedure</DialogTitle>
            <div className="space-y-4 mt-4">
              <FloatingLabelInput
                onChange={(value) => handleChange(value, "name")}
                label="Name"
                value={value?.name || ""}
              />
              <FloatingLabelTextarea
                placeholder="Description"
                onChange={(e) => handleChange(e.target.value, "description")}
                value={value?.description || ""}
              />
              <Select
                value={value?.group || "ungrouped"}
                onValueChange={(val) => handleChange(val, "type")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ungrouped">Ungrouped</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => setOpenCreate(false)}
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button onClick={onSave}>Create</Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
