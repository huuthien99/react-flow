import FormCondition from "@/components/FormCondition";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useReactFlow } from "@xyflow/react";
import { Edit2, Trash2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ConditionNodeForm({ selectedNode }) {
  const { data, id } = selectedNode;
  const { updateNodeData } = useReactFlow();

  const [listBranch, setListBranch] = useState(() => data?.branches || []);
  const [openPopupAddCondition, setOpenPopupAddCondition] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);

  const handleDelete = useCallback(
    (e, conId) => {
      e.stopPropagation();
      const newListBranches = listBranch.filter((cond) => cond.id !== conId);

      updateNodeData(id, { branches: newListBranches });
      setListBranch(newListBranches);
    },
    [id, updateNodeData, listBranch]
  );

  const handleAddBranch = () => {
    const newBranch = {
      id: uuidv4(),
      operator: "",
      conditions: [],
      label: `Condition ${listBranch.length + 1}`,
    };
    const newBranches = [...listBranch, newBranch];
    updateNodeData(id, { branches: newBranches });
    setListBranch(newBranches);
  };

  const handleShowPopupAddCondition = (e, data) => {
    e.stopPropagation();
    setOpenPopupAddCondition(true);
    setSelectedCondition(data);
  };

  return (
    <div className="space-y-4 mt-2">
      <Button onClick={handleAddBranch} variant="outline">
        Add Branch Condition
      </Button>
      <div>
        {listBranch.map((condition) => (
          <div
            key={condition.id}
            className="flex justify-between items-center px-1 py-3 border-b"
            onClick={(e) => handleShowPopupAddCondition(e, condition)}
          >
            <p className="">{condition.label || "Condition"}</p>
            <div className="flex gap-4">
              <Edit2
                className="cursor-pointer"
                size={17}
                onClick={(e) => handleShowPopupAddCondition(e, condition)}
              />
              <Trash2
                size={17}
                className="text-red-500 cursor-pointer"
                onClick={(e) => handleDelete(e, condition.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={openPopupAddCondition}
        onOpenChange={setOpenPopupAddCondition}
      >
        <DialogContent className={"min-h-[400px]"}>
          <DialogHeader>
            <DialogTitle className="border-b pb-2">
              {selectedCondition?.label}
            </DialogTitle>
            <FormCondition />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ConditionNodeForm;
