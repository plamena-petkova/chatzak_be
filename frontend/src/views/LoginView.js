import { Box, Button, Card, CardCover, Input, Typography, Link, } from "@mui/joy";
import { useEffect, useState } from "react";
import logo from "../assets/chatzakLogo.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authReducer";
import { socket } from "../socket";
import ErrorAlert from "../components/ErrorAlert";

function LoginView() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState(false);
  const [open, setOpen] = useState(false);


  const onCloseHandler = () => {
    setOpen(false);
    setUsername("");
    setPassword("");
  };

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (username !== "" && password !== "") {
      setCredentials(true);
    }
  }, [username, password]);

  const submitLoginHandler = async (event) => {
    event.preventDefault();

    const data = { username, password };

    if (credentials) {
      dispatch(login(data))
        .unwrap()
        .then(() => {
          socket.connect();
          navigate("/chat");
        })
        .catch((error) => {
          console.error("Error", error);
          setOpen(true);
          return;
        });
    }
  };

  return (
    <>
      {open ? <ErrorAlert onCloseHandler={onCloseHandler} /> : null}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <Card sx={{ minWidth: 400, minHeight: 200 }}>
          <Card
            sx={{
              maxWidth: 400,
              minHeight: 200,
              borderRadius: "sm"
            }}
          >
            <CardCover>
              <img src={logo} alt="logo" />
            </CardCover>
          </Card>
          <Box sx={{ maxWidth: 400, justifyContent: "center" }}>
            <Box
              sx={{ maxWidth: 400, display: "flex", justifyContent: "center" }}
            >
              <Typography sx={{ fontSize: 25 }}>Login</Typography>
            </Box>
            <Box component="form" onSubmit={submitLoginHandler}>
              <Input
                placeholder="Type your username"
                type="text"
                sx={{ m: 1 }}
                onChange={usernameHandler}
                value={username}
              />
              <Input
                placeholder="Type your password"
                type="password"
                sx={{ m: 1 }}
                onChange={passwordHandler}
                value={password}
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button type="submit" disabled={!credentials}>
                  Login
                </Button>
              </Box>
            </Box>
           
          </Box>
          <Link sx={{justifyContent:'center', ml:4, mr:4, fontSize:'sm'}} variant="soft" href="/register" >If you don't have an account, register here!</Link>
        </Card>
       
      </Box>
    
    </>
  );
}

export default LoginView;
