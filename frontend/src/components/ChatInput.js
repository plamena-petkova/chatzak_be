import { Box, Button, Input, Tooltip } from "@mui/joy";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import Picker from "emoji-picker-react";
import InsertEmoticonSharpIcon from "@mui/icons-material/InsertEmoticonSharp";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "../App.css";
import { styled } from "@mui/material/styles";

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState("");

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
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if(selectedFile) {
      socket.emit('fileUpload', selectedFile);
      setMsg(image);
    }
  }

  useEffect(() => {
   
      socket.on("fileUploadResponse", (image) => {
      setImage(`data:image/jpg;base64,${image}`);
    })
}, [socket,image])

  return (
    <Box>
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
              <Button onClick={handleFileUpload} sx={{ ml: "2px" }} variant="soft" component="label">
                <AddCircleIcon />
                <VisuallyHiddenInput onChange={handleFileChange} type="file" />
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
//{image && <img style={{ width: '100px', height: '100px' }} src={image} alt="sendedFile" />}