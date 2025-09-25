import { Dialog } from "@/components/ui/dialog";
import { dialogTypes } from "@/constants/constants";
import { useDialog } from "@/context/DialogContext";

function DialogCommon({ children, type = dialogTypes.NODE }) {
  const { open, setOpen, dialogType } = useDialog();

  return (
    <Dialog open={open && dialogType === type} onOpenChange={setOpen}>
      {children}
    </Dialog>
  );
}

export default DialogCommon;
