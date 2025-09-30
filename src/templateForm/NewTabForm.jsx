import FloatingLabelInput from "@/common/FloatingLabelInput";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

function NewTabForm({ selectedNode, handleBlur }) {
  if (!selectedNode) return null;
  const { data = {} } = selectedNode;
  const [url, setUrl] = React.useState(() => {
    return data?.url || "";
  });

  const [timeWait, setTimeWait] = useState(() => data?.timeWait || 0);

  const onChangeUrl = (value) => {
    setUrl(value);
  };

  const onChangeTimeWait = (value) => {
    setTimeWait(value);
  };

  return (
    <div className="space-y-4 mt-2">
      <div className="space-y-4">
        <Label>Open new tab with url</Label>
        <FloatingLabelInput
          label="URL"
          value={url}
          onChange={onChangeUrl}
          onExtraClick={() => {}}
          handleBlur={() => handleBlur && handleBlur({ url })}
        />
      </div>
      <div className="space-y-2">
        <Label>Wait until the event is triggered</Label>
        <Select
          defaultValue={data?.typeLoad || "domContent"}
          onValueChange={(value) => handleBlur({ typeLoad: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Load" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="load">Load</SelectItem>
            <SelectItem value="domContent">Dom Content Loaded</SelectItem>
            <SelectItem value="networkidle0">Networkidle0</SelectItem>
            <SelectItem value="networkidle0">Networkidle2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        <Label />
        <FloatingLabelInput
          label="Time wait"
          value={timeWait}
          type="int"
          onChange={onChangeTimeWait}
          onExtraClick={() => {}}
          handleBlur={() => {
            if (timeWait === "") setTimeWait(0);
            handleBlur && handleBlur({ timeWait: timeWait });
          }}
        />
      </div>
      <div className="space-y-4">
        <Label>
          * The default timeout is 0 to wait until the page is loaded.
        </Label>
      </div>
    </div>
  );
}

export default NewTabForm;
