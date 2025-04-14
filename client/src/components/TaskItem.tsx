import { ListItem, ListItemText, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <ListItem
      key={task.id}
      secondaryAction={
        <IconButton edge="end" color="error" onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
      <ListItemText
        primary={task.text}
        sx={{ textDecoration: task.completed ? "line-through" : "none" }}
      />
    </ListItem>
  );
}
