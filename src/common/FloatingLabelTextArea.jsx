import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Code2 } from "lucide-react";
import React from "react";

export default function FloatingLabelTextarea({
  value,
  onChange = () => {},
  onExtraClick = () => {},
  placeholder = "",
  className,
  isShowBtn = false,
  ...props
}) {
  return (
    <div className="relative w-full">
      <Textarea
        value={value}
        onChange={onChange}
        {...props}
        placeholder=" "
        className="peer h-32 resize-none"
      />
      <Label
        className="
          absolute left-3 top-3 text-gray-400 text-base 
          transition-all duration-200 bg-background px-1 rounded-[3px]
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
          peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary
          peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-primary

        "
      >
        {placeholder}
      </Label>

      {isShowBtn && (
        <Button
          variant="outline"
          onClick={onExtraClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-foreground cursor-pointer"
        >
          {`{X}`}
        </Button>
      )}
    </div>
  );
}
