import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";
import { Edit2, Trash2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ConditionNode({ selectedNode }) {
  const { data, id } = selectedNode;
  const { updateNodeData } = useReactFlow();

  const [listBranch, setListBranch] = useState(() => data?.conditions || []);

  const handleDelete = useCallback(
    (conId) => {
      const newConditions = listBranch.filter((cond) => cond.id !== conId);

      updateNodeData(id, { conditions: newConditions });
      setListBranch(newConditions);
    },
    [id, updateNodeData, listBranch]
  );

  const handleAddBranch = () => {
    const newCondition = {
      id: uuidv4(),
      label: `Condition ${listBranch.length + 1}`,
      rules: [],
    };
    const newConditions = [...listBranch, newCondition];
    updateNodeData(id, { conditions: newConditions });
    setListBranch(newConditions);
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
          >
            <p className="">{condition.label || "Condition"}</p>
            <div className="flex gap-4">
              <Edit2 className="cursor-pointer" size={17} />
              <Trash2
                size={17}
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(condition.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConditionNode;
