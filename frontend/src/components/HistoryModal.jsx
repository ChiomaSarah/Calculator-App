import * as React from "react";
import { Button, Box, Typography, Divider } from "@mui/material";
import Modal from "@mui/material/Modal";
import History from "./History";

export default function HistoryModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "28px",
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <img src="history_icon.png" alt="history" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="text.secondary"
          >
            History
          </Typography>
          <Divider />
          <History />
          <br />
          <Divider />
          <Button
            variant="contained"
            size="small"
            onClick={handleClose}
            id="close-button"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
