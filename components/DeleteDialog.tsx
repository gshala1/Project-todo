import Image from "next/image";
import iconTrash from "@/assets/trash-01.svg";
import iconX from "@/assets/x-close.svg";
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DeleteModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  handleClose,
  handleDelete,
}) => {
  const handleConfirmDelete = () => {
    handleDelete();
    handleClose();
  };

  return (
    <Dialog className="dialog-delete" open={open} onClose={handleClose}>
      <div className="all-img">
        <Image className="img-trash" src={iconTrash} alt="icon-trash" />
        <Image
          className="img-x"
          onClick={handleClose}
          src={iconX}
          alt="icon-x"
        />
      </div>

      <DialogTitle className="title-delete">Delete Task</DialogTitle>
      <DialogContent className="text-content">
        <DialogContentText>
          Are you sure you want to delete this task? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions className="all-btnn">
        <Button
          className="btnn-cancel"
          onClick={handleClose}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          className="btnn-delete"
          onClick={handleConfirmDelete}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
