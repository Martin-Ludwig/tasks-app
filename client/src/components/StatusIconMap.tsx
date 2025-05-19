import { TaskStatus } from "@/types/Task";
import {
  ArrowLeft,
  ArrowRight,
  CircleSmall,
  Dot,
  Minus,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface StatusIconMapProps {
  state: number;
}

const iconsize = 16;

export default function StatusIconMap({ state }: StatusIconMapProps) {
  switch (state) {
    case TaskStatus.Open:
      return <OpenIcon />;

    case TaskStatus.Completed:
      return <CompletedIcon />;

    case TaskStatus.Irrelevant:
      return <IrrelevantIcon />;

    case TaskStatus.Migrated:
      return <MigratedIcon />;

    case TaskStatus.Scheduled:
      return <ScheduledIcon />;

    case TaskStatus.Note:
      return <NoteIcon />;

    case TaskStatus.Event:
      return <EventIcon />;
  }
}

export function OpenIcon() {
  return (
    <StatusIcon tooltip="Offen">
      <Dot size={iconsize} />
    </StatusIcon>
  );
}

export function CompletedIcon() {
  return (
    <StatusIcon tooltip="Completed">
      <X size={iconsize} />
    </StatusIcon>
  );
}
export function IrrelevantIcon() {
  return (
    <StatusIcon tooltip="Closed">
      <X size={iconsize} className="text-red-500"/>
    </StatusIcon>
  );
}
export function MigratedIcon() {
  return (
    <StatusIcon tooltip="Migrated">
      <ArrowRight size={iconsize} />
    </StatusIcon>
  );
}
export function ScheduledIcon() {
  return (
    <StatusIcon tooltip="Scheduled">
      <ArrowLeft size={iconsize} />
    </StatusIcon>
  );
}
export function NoteIcon() {
  return (
    <StatusIcon tooltip="Note">
      <Minus size={iconsize} className="text-blue-500" />
    </StatusIcon>
  );
}
export function EventIcon() {
  return (
    <StatusIcon tooltip="Event">
      <CircleSmall size={iconsize} className="text-blue-500" />
    </StatusIcon>
  );
}

interface StatusIconProps {
  tooltip: string;
  children: React.ReactNode;
}

export function StatusIcon({ tooltip, children }: StatusIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
