import FloatingLabelInput from "@/common/FloatingLabelInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocateFixed } from "lucide-react";
import React, { useState } from "react";

function SelectOptionsForm({ selectedNode, handleBlur }) {
  if (!selectedNode) return null;
  const { data = {} } = selectedNode;
  const [elementSelector, setElementSelector] = useState(
    () => data?.elementSelector || ""
  );

  const [value, setValue] = useState(() => data?.value || "");
  const [timeWait, setTimeWait] = useState(() => data?.timeWait || 10);

  return (
    <div className="space-y-4 mt-2">
      <div className="space-y-2">
        <Label>Select options from menu dropdown</Label>
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
      <div className="flex gap-2">
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
        label="Value"
        value={value}
        onExtraClick={() => {}}
        handleBlur={() => handleBlur({ value })}
        onChange={(val) => setValue(val)}
      />
      <FloatingLabelInput
        label="Time wait"
        value={timeWait}
        onExtraClick={() => {}}
        handleBlur={() => handleBlur({ timeWait })}
        onChange={(val) => setTimeWait(val)}
      />
    </div>
  );
}

export default SelectOptionsForm;
