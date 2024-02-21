"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import iconX from "@/assets/x-close.svg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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
  const [error, setError] = useState("");

  useEffect(() => {
    setEditedName(initialName);
  }, [initialName]);

  const handleInputChange = (event:any) => {
    setEditedName(event.target.value);
    setError('');
  };

  const handleSaveClick = () => {
    if (editedName.trim() === "") {
      setError("Task name cannot be empty");
    } else {
      handleSave(editedName);
      handleClose();
    }
   
  };

  return (
    <Dialog className="dialog" open={open} onClose={handleClose}>
     <div className="title-icon">
      <Image
          className="img-xx"
          onClick={handleClose}
          src={iconX}
          alt="icon-x"
        />
      <DialogTitle className="dialog-title">Edit Task  </DialogTitle>
      </div>
      <DialogContent className="dialog-content">
        
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
          error={!!error}
        />
       
      </DialogContent>
      <p>{error}</p>
      <DialogActions className="dialog-actions">
        <Button onClick={handleClose}>Cancel</Button>
        <Button className='btn-savee' onClick={handleSaveClick}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
