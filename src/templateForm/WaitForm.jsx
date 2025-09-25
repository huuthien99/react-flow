import FloatingLabelInput from "@/common/FloatingLabelInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
function WaitForm({ selectedNode, handleBlur }) {
  const [timeStart, setTimeStart] = useState(() => {
    return selectedNode?.data?.timeWaitFrom || 1;
  });
  const [timeEnd, setTimeEnd] = useState(() => {
    return selectedNode?.data?.timeWaitTo || 3;
  });

  const onChangeTimeStart = (value) => {
    setTimeStart(value);
  };
  const onChangeTimeEnd = (value) => {
    setTimeEnd(value);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block font-light">
          Wait a while before continuing
        </label>
        <Select
          defaultValue={selectedNode?.data?.typeWait || "random"}
          onValueChange={(value) => handleBlur({ typeWait: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="random">Random</SelectItem>
            <SelectItem value="permanent">Permanent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {selectedNode?.data?.typeWait === "random" ? (
        <div className="flex gap-2">
          <FloatingLabelInput
            label="Time start (s)"
            value={timeStart}
            onChange={onChangeTimeStart}
            type="int"
            onExtraClick={() => {}}
            handleBlur={() => handleBlur({ timeWaitFrom: Number(timeStart) })}
          />
          <FloatingLabelInput
            label="Time end (s)"
            value={timeEnd}
            onChange={onChangeTimeEnd}
            type="int"
            onExtraClick={() => {}}
            handleBlur={() => handleBlur({ timeWaitTo: Number(timeEnd) })}
          />
        </div>
      ) : (
        <FloatingLabelInput
          label="Time Permanent (s)"
          value={timeStart}
          onChange={onChangeTimeStart}
          type="int"
          onExtraClick={() => {}}
          handleBlur={() => handleBlur({ timeWaitFrom: Number(timeStart) })}
        />
      )}
    </div>
  );
}

export default WaitForm;
