import FormCondition from "@/components/FormCondition";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

const createCondition = () => ({
  id: uuidv4(),
  type: "condition",
  field: "",
  field1: "",
  operator: "",
  value: "",
  value1: "",
});

const createGroup = () => ({
  id: uuidv4(),
  type: "group",
  operator: "AND",
  children: [createCondition()],
});

const createOperator = () => ({
  id: uuidv4(),
  type: "operator",
  value: "OR",
});

export default function ConditionDialog({
  selectedBranch,
  open,
  onOpenChange,
  listBranch,
  updateBranchConditions,
}) {
  const { indx = "", label = "" } = selectedBranch || {};
  const currentConditions = listBranch[indx]?.conditions || [];

  const handleAddNewGroup = () => {
    updateBranchConditions([createGroup()]);
  };

  const addConditionToGroup = (groupId) => {
    const newConditions = currentConditions.map((b) =>
      b.type === "group" && b.id === groupId
        ? { ...b, children: [...b.children, createCondition()] }
        : b
    );
    updateBranchConditions(newConditions);
  };

  const removeConditionFromGroup = (groupId, conditionId) => {
    let newConditions = currentConditions
      .map((b) => {
        if (b.type !== "group" || b.id !== groupId) return b;
        const newChildren = b.children.filter((c) => c.id !== conditionId);
        if (newChildren.length === 0) return null;
        return { ...b, children: newChildren };
      })
      .filter(Boolean);

    newConditions = newConditions.filter((b, idx, arr) => {
      if (
        b.type === "operator" &&
        (idx === 0 || arr[idx - 1].type === "operator")
      ) {
        return false;
      }
      return true;
    });

    if (newConditions[0]?.type === "operator") newConditions.shift();
    if (newConditions.at(-1)?.type === "operator") newConditions.pop();

    updateBranchConditions(newConditions);
  };

  const addConditionToLastGroup = () => {
    const lastGroup = [...currentConditions]
      .reverse()
      .find((b) => b.type === "group");
    if (lastGroup) {
      addConditionToGroup(lastGroup.id);
    } else {
      updateBranchConditions([...currentConditions, createGroup()]);
    }
  };

  const addGroupAtEnd = () => {
    if (currentConditions.length === 0) return;

    const lastGroupIndex = currentConditions
      .map((b) => b.type)
      .lastIndexOf("group");
    if (lastGroupIndex === -1) {
      updateBranchConditions([...currentConditions, createGroup()]);
      return;
    }

    const newConditions = [...currentConditions];
    newConditions.splice(
      lastGroupIndex + 1,
      0,
      createOperator(),
      createGroup()
    );
    updateBranchConditions(newConditions);
  };
  const handleUpdateCondition = (groupId, conditionId, updatedCond) => {
    const newConditions = currentConditions.map((block) => {
      if (block.type !== "group" || block.id !== groupId) return block;
      return {
        ...block,
        children: block.children.map((c) =>
          c.id === conditionId ? { ...c, ...updatedCond } : c
        ),
      };
    });

    updateBranchConditions(newConditions);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[500px] overflow-auto">
        <DialogHeader>
          <DialogTitle className="border-b pb-2">
            {label || `Branch ${indx + 1}`}
          </DialogTitle>

          {currentConditions.length === 0 && (
            <div className="mt-4">
              <Button onClick={handleAddNewGroup} variant="outline">
                Add condition
              </Button>
            </div>
          )}

          <div className="mt-4 space-y-4">
            {currentConditions.map((block, idx) => {
              if (block.type === "group") {
                const next = currentConditions[idx + 1];
                const showAddAndBetween =
                  next && next.type === "operator" && next.value === "OR";

                return (
                  <div key={block.id} className="relative">
                    <div
                      className={cn(
                        `relative rounded-[20px]`,
                        block.children.length > 1 &&
                          "border-l-2 border-cyan-400 pl-4"
                      )}
                    >
                      {block.children.length > 1 && (
                        <div className="absolute z-10 -left-[18px] top-1/2 bg-cyan-400 text-white text-xs font-bold px-2 py-1 rounded-md">
                          AND
                        </div>
                      )}

                      {block.children.map((cond) => (
                        <div
                          key={cond.id}
                          className="relative mb-2 last:mb-0 border rounded p-2"
                        >
                          <FormCondition
                            data={cond}
                            removeBlock={() =>
                              removeConditionFromGroup(block.id, cond.id)
                            }
                            onChange={(updatedCond) =>
                              handleUpdateCondition(
                                block.id,
                                cond.id,
                                updatedCond
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>

                    {showAddAndBetween && (
                      <div className="mt-2 flex ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addConditionToGroup(block.id)}
                        >
                          AND
                        </Button>
                      </div>
                    )}
                  </div>
                );
              }

              if (block.type === "operator") {
                return (
                  <div key={block.id} className="flex items-center my-2">
                    <div className="bg-yellow-400 text-black text-xs font-bold p-2 rounded-sm">
                      OR
                    </div>
                    <div className="flex-1 h-[1px] bg-yellow-400" />
                  </div>
                );
              }

              return null;
            })}
          </div>

          {currentConditions.length > 0 && (
            <div className="flex gap-2 mt-4">
              <Button onClick={addConditionToLastGroup} variant="outline">
                AND
              </Button>
              <Button onClick={addGroupAtEnd} variant="outline">
                OR
              </Button>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
