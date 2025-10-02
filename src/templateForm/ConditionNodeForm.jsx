import ConditionDialog from "@/components/Conditiondialog";
import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import { Edit2, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ConditionNodeForm({ selectedNode }) {
  if (!selectedNode) return null;
  const { data, id } = selectedNode;
  const { updateNodeData } = useReactFlow();

  const [listBranch, setListBranch] = useState(() => data?.branches || []);
  const [openPopupAddCondition, setOpenPopupAddCondition] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

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
      conditions: [],
      label: `Branch ${listBranch.length + 1}`,
    };
    const newBranches = [...listBranch, newBranch];
    updateNodeData(id, { branches: newBranches });
    setListBranch(newBranches);
  };

  const handleShowPopupAddCondition = (e, data, indx) => {
    e.stopPropagation();
    setOpenPopupAddCondition(true);
    setSelectedBranch({ ...data, indx: indx });
  };

  const updateBranchConditions = (newConditions) => {
    setListBranch((prev) => {
      const updated = [...prev];
      const { indx = "" } = selectedBranch || {};
      updated[indx] = { ...updated[indx], conditions: newConditions };

      if (id) {
        updateNodeData(id, {
          ...data,
          branches: updated,
        });
      }

      return updated;
    });
  };

  return (
    <div className="space-y-4 mt-2">
      <Button onClick={handleAddBranch} variant="outline">
        Add Branch Condition
      </Button>
      <div>
        {listBranch.map((condition, index) => (
          <div
            key={condition.id}
            className="flex justify-between items-center px-1 py-3 border-b"
            onClick={(e) => handleShowPopupAddCondition(e, condition, index)}
          >
            <p className="">{condition.label || "Condition"}</p>
            <div className="flex gap-4">
              <Edit2
                className="cursor-pointer"
                size={17}
                onClick={(e) =>
                  handleShowPopupAddCondition(e, condition, index)
                }
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
      <ConditionDialog
        open={openPopupAddCondition}
        onOpenChange={setOpenPopupAddCondition}
        selectedBranch={selectedBranch}
        listBranch={listBranch}
        updateBranchConditions={updateBranchConditions}
      />
    </div>
  );
}

export default ConditionNodeForm;
