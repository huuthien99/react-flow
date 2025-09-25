import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { typeNodes } from "@/constants/constants";
import { useDialog } from "@/context/DialogContext";
import { useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
function DialogCommon({}) {
  const [open, setOpen, selectedNode, setSelectedNode] = useDialog();
  const [note, setNote] = useState();

  const Form = selectedNode ? typeNodes[selectedNode?.type]?.form : null;
  const { setNodes } = useReactFlow();

  useEffect(() => {
    setNote(selectedNode?.data?.note || "");
  }, [selectedNode]);

  const handleBlur = (data) => {
    setNodes((prev) => {
      const next = prev.map((node) =>
        node.id === selectedNode?.id
          ? { ...node, data: { ...node.data, ...data } }
          : node
      );

      // cập nhật lại selectedNode trong context
      const updated = next.find((n) => n.id === selectedNode?.id);
      setSelectedNode(updated);
      return next;
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">
              {selectedNode?.data?.label}
            </DialogTitle>
            <Tabs defaultValue="option" className="w-[400px]">
              <TabsList className="w-full">
                <TabsTrigger value="option">Options</TabsTrigger>
                <TabsTrigger value="note">Note</TabsTrigger>
              </TabsList>
              <TabsContent value="option">
                {Form && (
                  <Form selectedNode={selectedNode} handleBlur={handleBlur} />
                )}
              </TabsContent>
              <TabsContent value="note">
                <Textarea
                  placeholder="Write your note here."
                  className="w-full"
                  value={note}
                  onBlur={(e) => handleBlur({ note: e.target.value })}
                  onChange={(e) => {
                    const { value } = e.target;
                    setNote(value);
                  }}
                />
              </TabsContent>
            </Tabs>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogCommon;
