import FloatingLabelInput from "@/common/FloatingLabelInput";
import FloatingLabelTextarea from "@/common/FloatingLabelTextArea";
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

function TypingTextForm({ selectedNode, handleBlur }) {
  if (!selectedNode) return null;
  const { data = {} } = selectedNode;
  const [text, setText] = useState(() => data?.text || "");
  const [time, setTime] = useState(() => data?.time || 0);
  const [elementSelector, setElementSelector] = useState(
    () => data.elementSelector || ""
  );
  return (
    <div className="space-y-4 mt-2">
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
      {data?.selectorType && (
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
      )}
      <FloatingLabelTextarea
        isShowBtn={true}
        placeholder="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => handleBlur({ text })}
      />
      <FloatingLabelInput
        value={time}
        onChange={(value) => setTime(value)}
        label="Interval between taps(s)"
        handleBlur={() => handleBlur({ time })}
      />
    </div>
  );
}

export default TypingTextForm;
