import React from "react";
import { cn } from "@/lib/utils"; // falls du shadcn's `cn()` nutzt – sonst einfach entfernen

export interface TaskInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TaskInput = React.forwardRef<HTMLInputElement, TaskInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
        "placeholder:text-muted-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    );
  }
);

TaskInput.displayName = "TaskInput";

export default TaskInput;
