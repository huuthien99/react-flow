import FloatingLabelInput from "@/common/FloatingLabelInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useState } from "react";
function FormCondition({ data, removeBlock, onChange }) {
  const [value, setValue] = useState(() => data?.value || "");
  const [value1, setValue1] = useState(() => data?.value1 || "");
  const handleChangeValue = (e) => {
    setValue(e);
  };
  const handleChangeValue1 = (e) => {
    setValue1(e);
  };
  const handleFieldChange = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <div>
      <Accordion type="multiple" defaultValue={["item-1"]}>
        <AccordionItem
          className={"!border px-2 py-1 rounded-[6px]"}
          value="item-1"
        >
          <AccordionTrigger className={`flex items-center justify-between`}>
            {!data?.label && (
              <div>
                <Trash2
                  onClick={(e) => {
                    e.stopPropagation();
                    removeBlock();
                  }}
                  size={17}
                  className="text-red-500 cursor-pointer mr-2"
                />
              </div>
            )}

            {data?.label && <span>{data.label}</span>}
            {data?.label && (
              <div className="flex items-center justify-end gap-2">
                <Trash2
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("delete");
                  }}
                  size={17}
                  className="text-red-500 cursor-pointer"
                />
              </div>
            )}
          </AccordionTrigger>
          <AccordionContent className={"space-y-4"}>
            <div className="flex gap-4 mt-4">
              <Select
                value={data?.field}
                onValueChange={(v) => handleFieldChange("field", v)}
              >
                <SelectTrigger className="w-[50%]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Value</SelectLabel>
                    <SelectItem value="value">Value</SelectItem>
                    <SelectItem value="dataExists">data exists</SelectItem>
                    <SelectItem value="dataNotExist">
                      data does not exist
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Element</SelectLabel>
                    <SelectItem value="text">Text element</SelectItem>
                    <SelectItem value="elementExist">Element exist</SelectItem>
                    <SelectItem value="elementNotExist">
                      Element dose not exist
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="w-[50%]">
                <FloatingLabelInput
                  label="Value 1"
                  value={value || ""}
                  onChange={(e) => handleChangeValue(e)}
                  onExtraClick={() => {}}
                  handleBlur={() => handleFieldChange("value", value)}
                />
              </div>
            </div>
            {(data?.field === "value" ||
              data?.field === "text" ||
              data?.field === "") && (
              <>
                <div>
                  <Select
                    value={data?.operator}
                    onValueChange={(v) => handleFieldChange("operator", v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Basic</SelectLabel>
                        <SelectItem value="equal">Equal</SelectItem>
                        <SelectItem value="equal-case">
                          Equal (case insensitive)
                        </SelectItem>
                        <SelectItem value="other">Other </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Number</SelectLabel>
                        <SelectItem value="greaterThan">
                          Greater than
                        </SelectItem>
                        <SelectItem value="greaterThanOrEqual">
                          Greater than or equal
                        </SelectItem>
                        <SelectItem value="lessThan">Less than</SelectItem>
                        <SelectItem value="lessThanOrEqual">
                          Less than or equal
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Text</SelectLabel>
                        <SelectItem value="contain">Contain</SelectItem>
                        <SelectItem value="containCase">
                          Contain (case insensitive)
                        </SelectItem>
                        <SelectItem value="doesNotContain">
                          Does not contain
                        </SelectItem>
                        <SelectItem value="doesNotContainCase">
                          Does not contain (case insensitive)
                        </SelectItem>
                        <SelectItem value="startWith">Start with</SelectItem>
                        <SelectItem value="endWith">End with</SelectItem>
                        <SelectItem value="regex">Fits RegEx</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Boolean</SelectLabel>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-4">
                  <Select
                    value={data?.field1}
                    onValueChange={(v) => handleFieldChange("field1", v)}
                  >
                    <SelectTrigger className="w-[50%]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Value</SelectLabel>
                        <SelectItem value="value">Value</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Element</SelectLabel>
                        <SelectItem value="text">Text element</SelectItem>
                        <SelectItem value="elementAttribute">
                          Element attribute value
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="w-[50%]">
                    <FloatingLabelInput
                      label="Value 2"
                      value={value1 || ""}
                      onChange={(e) => handleChangeValue1(e)}
                      onExtraClick={() => {}}
                      handleBlur={() => handleFieldChange("value1", value1)}
                    />
                  </div>
                </div>
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default FormCondition;
