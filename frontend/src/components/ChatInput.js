import { Box, Button, DialogTitle, Input, Modal, ModalDialog, Tooltip, Typography } from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import Picker from "emoji-picker-react";
import InsertEmoticonSharpIcon from "@mui/icons-material/InsertEmoticonSharp";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../App.css";
import { styled } from "@mui/material/styles";
import ErrorAlert from "./ErrorAlert";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  minWidth: 265,
});

function ChatInput({ handleSendMsg, socket }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += event.emoji;
    setMsg(message);
  };

  const handleMessage = (event) => {
    setMsg(event.target.value);
  };

  const sendChat = (event) => {
    event.preventDefault();
    handleSendMsg(msg);
    setMsg("");
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        if (msg) {
          handleSendMsg(msg);
          setMsg("");
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [handleSendMsg, msg]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(e.target.files[0].size > 99000) {
      setError(true);
      return;
    }
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setMsg(`data:image/jpg;base64,${base64String}`)
    };
    
    reader.readAsDataURL(file);
    setIsOpen(false);
  };

  useEffect(() => {
    if(error) {
      setIsOpen(false);
    }
  }, [error]);

  const onCloseHandler = () => {
    setError(false);
  } 



  return (
    <Box>
      {error && <ErrorAlert message='The picture is too large' onCloseHandler={onCloseHandler} />}
      <Input
        onChange={handleMessage}
        value={msg}
        placeholder="Type your message..."
        startDecorator={
          <>
            <Tooltip title="Pick emoji" variant="soft">
              <Button onClick={handleEmojiPickerHideShow} variant="soft">
                <InsertEmoticonSharpIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Add picture" variant="soft">
              <Button  sx={{ ml: "2px" }} variant="soft"  onClick={() => setIsOpen(true)}>
              <AddCircleIcon />
               
                  <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <ModalDialog>
                      <DialogTitle sx={{ justifyContent: "center" }}>
                        Upload File
                      </DialogTitle>
                      <Typography>JPG, Max Size: 100kb</Typography>
                      <Button
                        sx={{ ml: "2px" }}
                        variant="soft"
                        component="label"
                      >
                        <AddCircleIcon />
                        <VisuallyHiddenInput
                          onChange={handleFileChange}
                          type="file"
                        />
                      </Button>
                    </ModalDialog>
                  </Modal>
           
              </Button>
            </Tooltip>
          </>
        }
        endDecorator={
          <Button
            onClick={sendChat}
            variant="soft"
            endDecorator={<SendIcon />}
            disabled={msg.length < 1}
          ></Button>
        }
      />
      {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
    </Box>
  );
}

export default ChatInput;
