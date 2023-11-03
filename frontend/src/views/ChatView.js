/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  TabList,
  TabPanel,
  Tabs,
  Chip,
  Button,
} from "@mui/joy";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";
import { sendMessageRoute } from "../utils/apiRoutes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createAvatar, fetchUsers, getUserById, setOnlineUsers } from "../store/authReducer";
import {
  deleteMessage,
  getAllMessages,
  setCurrentChat,
  setNewMessageIndicator,
} from "../store/chatReducer";
import ChatInput from "../components/ChatInput";
import ContactCard from "../components/ContactCard";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../socket";
import { useMediaQuery } from "@mui/material";

function ChatView() {
  const dispatch = useDispatch();

  const currentChat = useSelector((state) => state.chat.currentChat);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);
  const allUsers = useSelector((state) => state.auth.allUsers);
  const newMessageIndicator = useSelector((state) => state.chat.newMessageIndicator);
  const [message, setMessage] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState("");
  const [value, setValue] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [sticky, setSticky] = useState("top");
  const scrollableContainerRef = useRef(null);
  const [showRemoveIcon, setShowRemoveIcon] = useState({ id: "", show: false });
  const [messageDeleted, setMessageDeleted] = useState(false);
  const [dataMessage, setDataMessage] = useState({});
  const [doScroll, setDoScroll] = useState(true);

  const isSmallScreen = useMediaQuery("(max-width:899px)");

  useEffect(() => {
    if (currentUser._id && !socket.connected) {
      socket.connect();
    }
    dispatch(fetchUsers());
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (allUsers.length && allUsers[value]) {
      dispatch(setCurrentChat(allUsers[value]));
    }
  }, [allUsers]);

  useEffect(() => {
    const data = {
      from: currentUser?._id,
      to: currentChat?._id,
    };
    dispatch(getAllMessages(data));
  }, [currentChat, message, currentUser, messageDeleted, dispatch]);

  useEffect(() => {
    if(currentChat._id !== dataMessage.from) {
      dispatch(setNewMessageIndicator({chatId:dataMessage.from, show:true }));
  }
    if(currentChat._id === newMessageIndicator[currentChat._id]?.chatId && newMessageIndicator[currentChat._id]?.show === true) {
        dispatch(setNewMessageIndicator({ chatId: currentChat._id, show: false}));
    }
    if(dataMessage.from && newMessageIndicator[currentChat._id]?.show === true) {
      dispatch(setNewMessageIndicator({ chatId: currentChat._id, show: false}));
      setDataMessage({});
    }
    if(dataMessage.from === currentChat._id) {
      setDataMessage({});
    }
   
  }, [currentChat, setDataMessage, dataMessage]);

  useEffect(() => {
    if (socket) {
      socket.on("msg-receive", (data) => {
        setDataMessage(data);
        setArrivalMsg({ fromSelf: false, message: data.message });
      });
      socket.on("msg-edited", (data) => {
        setArrivalMsg({ fromSelf: false, message: data.message });
      });
      socket.on('update-users', (users) => {
        dispatch(setOnlineUsers(users));
      })
    }
  
    if (!currentUser.avatarImg)
      dispatch(createAvatar({ currentUser }))
        .unwrap()
        .then(dispatch(getUserById(currentUser._id)));

    return () => {
      socket.off("msg-receive");
      socket.off("msg-edited");
      socket.off("update-users");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.emit("add-user", currentUser._id);
    }
  }, [currentChat]);


  useEffect(() => {
    arrivalMsg && setMessage((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  const handleChangeTab = (event, newValue) => {
    const currentChat = allUsers[newValue];
    setValue(newValue);
    dispatch(setCurrentChat(currentChat));
  };

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser?._id,
      to: currentChat?._id,
      message: msg,
    });

    socket.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...msg];
    msgs.push({ fromSelf: true, message: msg });

    setMessage(msgs);
  };

  const onDeleteHandler = (messageId) => {
    dispatch(deleteMessage(messageId));
    setMessageDeleted(!messageDeleted);
    socket.emit("edit-msg", {
      to: currentChat._id,
      from: currentUser._id,
    });
    setDoScroll(true);
  };

  const handleShowRemoveIcon = (messageId) => {
    setShowRemoveIcon({ id: messageId, show: true });
    if (messageId === showRemoveIcon.id) {
      const showIcon = { ...showRemoveIcon };
      showIcon.show = !showIcon.show;
      setShowRemoveIcon(showIcon);
    }
    setDoScroll(false);
  };

  useEffect(() => {
    if(doScroll) {
      scrollableContainerRef.current.scrollTop =
      scrollableContainerRef.current.scrollHeight;
    }
   
  }, [handleSendMsg]);

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

      <Tabs
        sx={{
          overflow: "auto",
          overflowY: "scroll",
          height: "60vh",
          maxHeight: "60vh",
          "&::-webkit-scrollbar": { display: "none" },
        }}
        onChange={handleChangeTab}
        aria-label="Vertical tabs"
        variant="scrollable"
        orientation={isSmallScreen ? "horizontal" : "vertical"}
        value={value}
        ref={scrollableContainerRef}
      >
        <TabList
          sticky={sticky}
          underlinePlacement={{ top: "bottom", bottom: "top" }[sticky]}
        >
          {allUsers.map((contact) => {
            return <ContactCard key={contact._id} contact={contact} />;
          })}
        </TabList>
        <TabPanel value={value} key={uuidv4()}>
          {messages.length > 0 &&
            messages.map((msg) => {
              if (msg.fromSelf) {
                return (
                  <Box
                    key={uuidv4()}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                      mt: 2,
                      mb: 2,
                      alignItems: "end",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Chip
                        variant="outlined"
                        color="primary"
                        size="lg"
                        disabled={msg.isRemoved}
                        onClick={() => handleShowRemoveIcon(msg.id)}
                      >
                        {msg.message}
                      </Chip>

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
              } else {
                return (
                  <Box
                    key={uuidv4()}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mt: 3,
                      mb: 3,
                    }}
                  >
                    <Chip
                      label="success"
                      color="success"
                      variant="outlined"
                      disabled={msg.isRemoved}
                    >
                      {msg.message}
                    </Chip>
                  </Box>
                );
              }
            })}
        </TabPanel>
      </Tabs>
      <Box sx={{ mt: 2 }}>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Box>
    </Box>
  );
}

export default ChatView;
