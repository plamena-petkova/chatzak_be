import { Box, Button, Typography } from "@mui/joy";
import { Paper } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";

function MessageComponent({
  msg,
  handleShowRemoveIcon,
  onDeleteHandler,
  showRemoveIcon,
  alignItems,
}) {
  return (
    <Box
      key={uuidv4()}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        mt: 2,
        mb: 2,
        alignItems: alignItems,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
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
        showRemoveIcon.show ? (
          <Button
            sx={{ zIndex: 100 }}
            size="sm"
            variant="plain"
            onClick={() => onDeleteHandler(msg.id)}
          >
            <DeleteIcon fontSize="sm" />
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}

export default MessageComponent;
