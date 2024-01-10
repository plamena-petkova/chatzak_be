import { Box } from "@mui/joy";
import ChatComponent from "../components/ChatComponent";
import Header from "../components/Header";
import SnackbarComponent from "../components/SnackbarComponent";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ChatView() {
  const newMessageIndicator = useSelector(
    (state) => state.chat.newMessageIndicator
  );
  const newMessageObject = Object.values(newMessageIndicator);
  const [openNewSnack, setOpenNewSnack] = useState(false);


useEffect(() => {
    if(newMessageObject.map(item => item.show).includes(true)) {
        setOpenNewSnack(true);
    }

}, [openNewSnack, newMessageObject])


  const handleCloseSnack = () => {
    setOpenNewSnack(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mr: 4,
        ml: 4,
        maxHeight: "90vh",
      }}
    >
      <Header />

      <SnackbarComponent open={openNewSnack} handleClose={handleCloseSnack} />

      <ChatComponent />
    </Box>
  );
}

export default ChatView;
