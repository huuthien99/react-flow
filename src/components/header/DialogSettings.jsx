import { useAppContext } from "@/App";
import DialogCommon from "@/common/DialogCommon";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { dialogTypes } from "@/constants/constants";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function DialogSettings() {
  const [options, setOptions] = useAppContext();
  const toggleOptions = (key) => {
    setOptions((prev) => {
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  return (
    <>
      <DialogCommon type={dialogTypes.SETTINGS}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <Tabs defaultValue="general" className="w-[400px]">
              <TabsList className="w-full">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="diagram">Diagram</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <div className="space-y-4 mt-4">
                  <div className="flex items-center space-x-2 text-[14px]">
                    <Switch
                      checked={options.isDebugMode}
                      onCheckedChange={() => toggleOptions("isDebugMode")}
                      className="cursor-pointer"
                      id="debug"
                    />
                    <Label
                      htmlFor="debug"
                      className="cursor-pointer text-[14px]"
                    >
                      Debug Mode
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 text-[14px]">
                    <Switch
                      checked={options.isAutoSave}
                      onCheckedChange={() => toggleOptions("isAutoSave")}
                      className="cursor-pointer"
                      id="auto"
                    />
                    <Label
                      htmlFor="auto"
                      className="cursor-pointer text-[14px]"
                    >
                      Auto save Mode
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 text-[14px]">
                    <Switch
                      checked={options.animated}
                      className="cursor-pointer"
                      id="animated"
                      onCheckedChange={() => toggleOptions("animated")}
                    />
                    <Label
                      htmlFor="animated"
                      className="cursor-pointer text-[14px]"
                    >
                      Animated Mode
                    </Label>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="diagram">zcadasd</TabsContent>
            </Tabs>
          </DialogHeader>
        </DialogContent>
      </DialogCommon>
    </>
  );
}

export default DialogSettings;
