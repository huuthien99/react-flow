import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { useReactFlow } from "@xyflow/react";
import { runFlow } from "@/adapter/flow";
function FlowRun() {
  const [open, setOpen] = useState(false);
  const [numberRecord, setNumberRecord] = useState(1);

  const [batchSize, setBatchSize] = useState(1);

  const { getNodes, getEdges } = useReactFlow();

  const allowOnlyNumber = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
      e.preventDefault();
    }
  };

  const onChangeInput = (e) => {
    const { value } = e.target;

    setBatchSize(value > numberRecord ? numberRecord : value);
  };

  const onCancel = () => {
    setOpen(false);
    setBatchSize(1);
    setNumberRecord(1);
  };

  const handleRun = async () => {
    try {
      const nodes = getNodes();
      const edges = getEdges();
      const data = {
        numberRecord: numberRecord,
        parallel: numberRecord > 1,
        batchSize: +batchSize,
        flowData: {
          nodes,
          edges,
        },
      };
      await runFlow(data);
      onCancel();
    } catch (error) {
      console.log("🚀 ~ handleRun ~ error:", error);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Run</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <div className="space-y-4 mt-4">
              <Select
                value={numberRecord}
                onValueChange={(v) => setNumberRecord(v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Number record" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={1}>One</SelectItem>
                  <SelectItem value={10}>Ten</SelectItem>
                  <SelectItem value={15}>Fifteen</SelectItem>
                </SelectContent>
              </Select>
              {numberRecord > 1 && (
                <Input
                  placeholder="batchSize"
                  onKeyDown={allowOnlyNumber}
                  value={batchSize}
                  onChange={onChangeInput}
                />
              )}
              <div className="flex gap-4 justify-end">
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={handleRun}>Run</Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FlowRun;
