import { Box, Button, Typography, Input } from "@mui/joy";
import { FormControl, Paper } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

function MessageComponent({
  msg,
  handleShowRemoveIcon,
  onDeleteHandler,
  onEditHandler,
  showRemoveIcon,
  alignItems,
}) {
  const [editMessage, setEditMessage] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const onEditMode = () => {
    setEditMessage(true);
    setNewMessage(msg.message);
  };

  const editHandler = (messageId, event) => {
    setNewMessage(event.target.value);
    
  };

  const onSubmitHandler = (event, messageId) => {
    event.preventDefault();
    onEditHandler(messageId, newMessage);
    setEditMessage(false);
  };

  const editMessageInput = (
    <FormControl>
      <Input
        key={uuidv4()}
        sx={{ "--Input-focused": 1, width: 256 }}
        defaultValue={newMessage}
        onBlur={(event) => editHandler(msg.id, event)}
        endDecorator={
          <Button onClick={(event) => onSubmitHandler(event, msg.id)} variant="soft">
            <CheckIcon font="sm" />
          </Button>
        }
      />
    </FormControl>
  );

  return (
    <Box
      key={uuidv4()}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        mt: 2,
        mb: 2,
        alignItems: { alignItems },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {editMessage && 
          editMessageInput}
        
          <Paper
            onClick={() => handleShowRemoveIcon(msg.id)}
            variant="outlined"
            sx={{
              whiteSpace: "normal",
              maxWidth: 700,
              borderRadius: "18px",
              p: 0.5,
              cursor: "pointer",
            }}
            disabled={msg.isRemoved}
          >
            {msg.isRemoved ? (
              <Typography
                sx={{
                  mr: 1,
                  ml: 1,
                  color: "lightgrey",
                  fontWeight: "lg",
                  fontSize: "sm",
                  wordBreak: "break-word",
                }}
              >
                {msg.message.includes("data:image") ? (
                  <img
                    height={"150px"}
                    width={"auto"}
                    alt="imageSend"
                    src={msg.message}
                  />
                ) : (
                  msg.message
                )}
              </Typography>
            ) : (
              <Typography
                sx={{
                  mr: 1,
                  ml: 1,
                  color: "green",
                  fontWeight: "lg",
                  fontSize: "sm",
                  wordBreak: "break-word",
                }}
              >
                {msg.message.includes("data:image") ? (
                  <img
                    height={"150px"}
                    width={"auto"}
                    alt="imageSend"
                    src={msg.message}
                  />
                ) : (
                  msg.message
                )}
              </Typography>
            )}
          </Paper>

        {msg.id === showRemoveIcon.id &&
        !msg.isRemoved &&
        msg.fromSelf &&
        showRemoveIcon.show ? (
          <>
            <Button
              sx={{ zIndex: 100 }}
              size="sm"
              variant="plain"
              onClick={() => onDeleteHandler(msg.id)}
            >
              <DeleteIcon fontSize="sm" />
            </Button>
            <Button
              sx={{ zIndex: 100 }}
              size="sm"
              variant="plain"
              onClick={onEditMode}
            >
              <EditIcon fontSize="sm" />
            </Button>
          </>
        ) : null}
      </Box>
    </Box>
  );
}

export default MessageComponent;
