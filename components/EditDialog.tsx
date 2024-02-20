"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface EditDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (name: string) => void;
  initialName: string;
}

const EditDialog: React.FC<EditDialogProps> = ({
  open,
  handleClose,
  handleSave,
  initialName,
}) => {
  const [editedName, setEditedName] = useState(initialName);

  useEffect(() => {
    setEditedName(initialName);
  }, [initialName]);

  const handleInputChange = (event:any) => {
    setEditedName(event.target.value);
  };

  const handleSaveClick = () => {
    handleSave(editedName);
    handleClose();
  };

  return (
    <Dialog className="dialog" open={open} onClose={handleClose}>
      <DialogTitle className="dialog-title">Edit Task</DialogTitle>
      <DialogContent className="dialog-content">
        <DialogContentText className="dialog-text">
          {" "}
          Edit the task name:
        </DialogContentText>
        <TextField
          className="textfield"
          autoFocus
          margin="dense"
          id="editedName"
          label="Task Name"
          type="text"
          fullWidth
          value={editedName}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
