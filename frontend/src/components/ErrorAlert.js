import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, IconButton } from "@mui/joy";

function ErrorAlert({ onCloseHandler, message }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
      <Alert
        startDecorator={<WarningIcon />}
        variant="soft"
        color="danger"
        endDecorator={
          <>
            <IconButton
              onClick={onCloseHandler}
              variant="soft"
              size="sm"
              color="danger"
            >
              <CloseIcon />
            </IconButton>
          </>
        }
      >
        {message}
      </Alert>
    </Box>
  );
}

export default ErrorAlert;
