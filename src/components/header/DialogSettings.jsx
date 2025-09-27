import { useAppContext } from "@/App";
import DialogCommon from "@/common/DialogCommon";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppOptions, dialogTypes } from "@/constants/constants";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
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

  const [gap, setGap] = useState(() => options.diagramOptions.gap);
  const [size, setSize] = useState(() => options.diagramOptions.size);

  const onBlurGap = () => {
    if (!gap) setGap(1);
    setOptions((prev) => ({
      ...prev,
      diagramOptions: {
        ...prev.diagramOptions,
        gap: Number(gap) || 1,
      },
    }));
  };

  const onChangeGap = (e) => {
    const value = e.target.value;

    setGap(value);
  };
  const onBlurSize = () => {
    if (!size) setSize(1);
    setOptions((prev) => ({
      ...prev,
      diagramOptions: {
        ...prev.diagramOptions,
        size: Number(size) || 1,
      },
    }));
  };

  const onChangeSize = (e) => {
    const value = e.target.value;
    setSize(value);
  };
  const allowOnlyNumber = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
      e.preventDefault();
    }
  };

  const handleReset = () => {
    setOptions((prev) => ({
      ...prev,
      diagramOptions: {
        ...AppOptions.DIAGRAM_OPTIONS,
      },
    }));
    setGap(AppOptions.DIAGRAM_OPTIONS.gap);
    setSize(AppOptions.DIAGRAM_OPTIONS.size);
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
              <TabsContent value="diagram">
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label className="text-[14px]">Mesh Type</Label>
                    <RadioGroup
                      defaultValue={options.diagramOptions.meshType}
                      className="flex gap-6"
                      value={options.diagramOptions.meshType}
                      onValueChange={(value) =>
                        setOptions((prev) => ({
                          ...prev,
                          diagramOptions: {
                            ...prev.diagramOptions,
                            meshType: value,
                          },
                        }))
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dots" id="dots" />
                        <Label className="text-[14px]" htmlFor="dots">
                          Dot
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="lines" id="lines" />
                        <Label className="text-[14px]" htmlFor="lines">
                          Line
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[14px]">Transparent</Label>
                    <div className="flex gap-4">
                      <Slider
                        max={100}
                        min={0}
                        step={10}
                        value={[options.diagramOptions.transparent]}
                        onValueChange={(value) =>
                          setOptions((prev) => ({
                            ...prev,
                            diagramOptions: {
                              ...prev.diagramOptions,
                              transparent: Number(value[0]),
                            },
                          }))
                        }
                      />
                      <p>{options.diagramOptions.transparent}%</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[14px]">
                        Distance between two lines/dots(PX)
                      </Label>
                      <Input
                        value={gap}
                        onChange={onChangeGap}
                        onBlur={onBlurGap}
                        onKeyDown={allowOnlyNumber}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[14px]">
                        Size between two lines/dots(PX)
                      </Label>
                      <Input
                        value={size}
                        onChange={onChangeSize}
                        onBlur={onBlurSize}
                        onKeyDown={allowOnlyNumber}
                      />
                    </div>
                    <div className="flex justify-end space-y-2 mt-4">
                      <Button onClick={handleReset} variant={"outline"}>
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogHeader>
        </DialogContent>
      </DialogCommon>
    </>
  );
}

export default DialogSettings;
