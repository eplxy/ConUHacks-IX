import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  DialogProps,
} from "@mui/material";

interface UserNameDialogProps {
  open: boolean;
  dialogSubmit: (name: string) => void;
}

export default function UserNameDialog({
  open,
  dialogSubmit,
}: UserNameDialogProps) {
  const [name, setName] = useState<string>("");

  const handleSubmit = () => {
    dialogSubmit(name);
  };
  const handleClose: DialogProps["onClose"] = (event, reason) => {
    console.log(event);
    if (reason && reason === "backdropClick") return;
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter Your Name</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
