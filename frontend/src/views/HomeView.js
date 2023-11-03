import { Box, Button, Card, CardCover, Sheet, Typography } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import logo from "../assets/chatzakLogo.png";
import "../App.css";

import homePic from "../assets/remote-5491798_1280.png";

function HomeView() {
  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const isSmallScreen = useMediaQuery("(max-width:899px)");

  return (
    <Box type="div">
      <Sheet
        sx={{
          m: 4,
          borderRadius: "30px",
          backgroundColor: "#C2ECFA",
          minHeight: "80vh",
          minWidth: "70vw",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, pb:2 }}>
          <CardCover sx={{ maxWidth: 200, maxHeight: 100 }}>
            <img
              style={{
                borderTopLeftRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
              src={logo}
              alt="logo"
            />
          </CardCover>
          {isLargeScreen && (
            <>
              <Button
                component="a"
                variant="outlined"
                sx={{ mr: 4, mt: 2 }}
                href="/login"
              >
                Login
              </Button>
              <Button
                component="a"
                variant="outlined"
                sx={{ mr: 4, mt: 2 }}
                href="/register"
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            m: 5,
            pr: 4,
            pb: 4,
            pt: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 350,
              m: 2,
            }}
          >
            <Typography level="h2">Welcome to Chatzak</Typography>
            <Typography level="h5" sx={{ mt: 2 }}>
              Chatzak is a modern chat application designed to connect people
              with ease. Whether you're looking to chat with friends, family, or
              colleagues, Chatzak offers a seamless and user-friendly
              experience.
            </Typography>
            <Typography level="h5" sx={{ mt: 2 }}>
              Enjoy features such as sending messages, sharing emojis, and
              staying connected with your loved ones. Get started now by
              registering for a new account.
            </Typography>
            <Button
              component="a"
              variant="solid"
              sx={{ mr: 4, mt: 2 }}
              href="/register"
            >
              Sign Up
            </Button>
            {isSmallScreen && (
              <Button
                component="a"
                variant="solid"
                sx={{ mr: 4, mt: 2 }}
                href="/login"
              >
                Login
              </Button>
            )}
          </Box>
          {isLargeScreen && (
            <Card
              sx={{ width: 350, border: "none", backgroundColor: "#C2ECFA" }}
            >
              <img src={homePic} alt="homePic" />
            </Card>
          )}
        </Box>
      </Sheet>
    </Box>
  );
}

export default HomeView;
