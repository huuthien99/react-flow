import FloatingLabelInput from "@/common/FloatingLabelInput";
import FloatingLabelTextarea from "@/common/FloatingLabelTextArea";
import { format } from "date-fns";
import { EllipsisVertical, GitFork, SquareCode } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { deleteProcedure } from "@/adapter/procedure";
import { toast } from "sonner";
function Cart({ data, handleDelete, handleUpdate }) {
  const [open, setOpen] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);

  const [value, setValue] = useState(() => {
    return {
      name: data?.name || "",
      description: data?.description || "",
      group: data?.group || "",
    };
  });

  const handleChange = (value, key) => {
    setValue((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const onDelete = () => {
    if (handleDelete) handleDelete();
    setOpenDelete(false);
  };

  const onUpdate = () => {
    if (handleUpdate) handleUpdate(data?._id, value);
  };

  return (
    <div>
      <div className="space-y-2 p-3 border rounded-[6px]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <h3>{data?.name}</h3>
            <div className={cn("flex items-center gap-1")}>
              {data?.type === "code" ? (
                <SquareCode size={14} />
              ) : (
                <GitFork size={14} />
              )}
              <p>{data?.type}</p>
            </div>
            <p>{data?.group || "Ungrouped"}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Update info
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p>{data?.description}</p>
        <div className="text-gray-500 text-sm mt-1">
          Update At {format(new Date(data.updatedAt), "HH:mm dd/MM/yyyy")} |
          Create At {format(new Date(data.createdAt), "dd/MM/yyyy HH:mm")}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Procedure</DialogTitle>
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
                <SelectTrigger className="w-[50%]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ungrouped">Ungrouped</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end gap-2">
                <Button variant={"outline"}>Cancel</Button>
                <Button onClick={() => onUpdate()}>Update</Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <div className="flex gap-2 justify-end">
              <Button onClick={() => setOpenDelete(false)} variant={"outline"}>
                Back
              </Button>
              <Button onClick={onDelete} variant="destructive">
                Delete
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Cart;
