import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface AddTaskFormProps {
  onAddTask: (text: string) => void;
}


export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [newTodo, setNewTask] = useState("");

  const handleSubmit = () => {
    if (!newTodo.trim()) return;
    onAddTask(newTodo);
    setNewTask("");
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
      <TextField
        label="Neue Aufgabe"
        variant="outlined"
        fullWidth
        value={newTodo}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit}
        sx={{ textTransform: 'none' }}
      >
        Hinzufügen
      </Button>
    </Box>
  );
}
