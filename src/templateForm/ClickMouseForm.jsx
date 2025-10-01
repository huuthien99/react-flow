import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import FloatingLabelInput from "@/common/FloatingLabelInput";
import { LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
function ClickMouseForm({ selectedNode, handleBlur }) {
  if (!selectedNode) return null;
  const { data = {} } = selectedNode;

  const [coordinates, setCoordinates] = useState(
    () => data.coordinates || { x: 0, y: 0 }
  );
  const [elementSelector, setElementSelector] = useState(
    () => data.elementSelector || ""
  );
  const [timeWait, setTimeWait] = useState(() => data?.timeWait || 10);

  return (
    <div className="mt-2 space-y-4">
      <div className="space-y-2">
        <Label>Mode</Label>
        <Select
          defaultValue={data?.mode}
          onValueChange={(value) => handleBlur({ mode: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="click">Click</SelectItem>
            <SelectItem value="press">Press</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Push button</Label>
        <Select
          defaultValue={data?.pushBtn}
          onValueChange={(value) => handleBlur({ pushBtn: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="push button" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Selector Type</Label>
        <Select
          defaultValue={data?.selectType}
          onValueChange={(value) => handleBlur({ selectType: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selector Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="selector">Selector</SelectItem>
            <SelectItem value="coordinates">Coordinates</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {data.selectType === "selector" && (
        <>
          <div className="space-y-2">
            <Label>Selector Type</Label>
            <Select
              defaultValue={data?.selectorType}
              onValueChange={(value) => handleBlur({ selectorType: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selector Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xpath">Xpath</SelectItem>
                <SelectItem value="css">Css</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-2 flex gap-2">
            <FloatingLabelInput
              label="Element Selector"
              value={elementSelector}
              onExtraClick={() => {}}
              handleBlur={() => handleBlur({ elementSelector })}
              onChange={(val) => setElementSelector(val)}
            />
            <Button variant="outline">
              <LocateFixed />
            </Button>
          </div>
          <FloatingLabelInput
            label="Time wait"
            value={timeWait}
            onExtraClick={() => {}}
            type="int"
            handleBlur={() => handleBlur({ timeWait })}
            onChange={(val) => setTimeWait(val)}
          />
        </>
      )}
      {data.selectType === "coordinates" && (
        <div className="flex gap-4">
          <div className="w-[50%]">
            <FloatingLabelInput
              label="Coordinate x"
              value={coordinates.x}
              onExtraClick={() => {}}
              type="int"
              handleBlur={() => handleBlur({ coordinates })}
              onChange={(val) => setCoordinates({ ...coordinates, x: val })}
            />
          </div>
          <div className="w-[50%]">
            <FloatingLabelInput
              label="Coordinate y"
              value={coordinates.y}
              onChange={(val) => setCoordinates({ ...coordinates, y: val })}
              onExtraClick={() => {}}
              handleBlur={() => handleBlur({ coordinates })}
              type="int"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ClickMouseForm;
