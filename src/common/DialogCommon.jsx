import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialog } from "@/context/DialogContext";
import React from "react";

function DialogCommon({}) {
  const [open, setOpen, selectedNode, _] = useDialog();
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông tin Node</DialogTitle>
            <DialogDescription>
              <span>
                <strong>ID:</strong> {selectedNode?.id}
              </span>
              <span>
                <strong>Label:</strong> {selectedNode?.data?.label}
              </span>
              <span>
                <strong>Type:</strong> {selectedNode?.type}
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogCommon;
