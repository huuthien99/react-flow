import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React from "react";

function FloatingLabelInput({
  label = "",
  value = "",
  onChange = () => {},
  onExtraClick,
  type = "text",
  handleBlur = () => {},
}) {
  const allowOnlyNumber = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="relative w-full">
        <label className="absolute -top-2 left-2 bg-background px-1 text-xs text-muted-foreground">
          {label}
        </label>

        <div className="flex items-center rounded-md border border-input bg-background px-2 focus-within:ring-1 focus-within:ring-ring">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0 flex-1"
            onKeyDown={type === "int" ? allowOnlyNumber : null}
            type={type}
            onBlur={handleBlur}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={onExtraClick}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default FloatingLabelInput;
