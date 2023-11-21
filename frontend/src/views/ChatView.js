import { Box } from "@mui/joy";
import ChatComponent from "../components/ChatComponent";
import Header from "../components/Header";

function ChatView() {
 

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mr: 4,
        ml: 4,
      }}
    >
      <Header />

      <ChatComponent />
 
    </Box>
  );
}

export default ChatView;
