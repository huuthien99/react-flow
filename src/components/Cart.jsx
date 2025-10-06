import FloatingLabelInput from "@/common/FloatingLabelInput";
import FloatingLabelTextarea from "@/common/FloatingLabelTextArea";
import { format } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
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
function Cart({ data }) {
  const [open, setOpen] = useState(null);

  const [value, setValue] = useState(() => data);

  const handleChange = (value, key) => {
    setValue((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return (
    <div>
      <div className="space-y-2 p-3 border rounded-[6px]">
        <div className="flex justify-between">
          <div>
            <h3>{data?.name}</h3>
            <p>{data?.type}</p>
            <p>{data?.group}</p>
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
              <DropdownMenuItem>Delete</DropdownMenuItem>
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
                onChange={(e) => handleChange(e.target.value, "name")}
                label="Name"
                value={value?.name || ""}
              />
              <FloatingLabelTextarea
                placeholder="Description"
                onChange={(e) => handleChange(e.target.value, "description")}
                value={value?.description || ""}
              />
              <Select
                value={value?.type}
                onValueChange={(val) => handleChange(val, "type")}
              >
                <SelectTrigger className="w-[50%]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ungrouped">Ungrouped</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Cart;
