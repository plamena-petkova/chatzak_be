import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/joy";
import { updateUsersAvatar } from "../store/authReducer";

function NewAvatar({ onModalClose }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * currentUser.names.length);
    dispatch(updateUsersAvatar({ currentUser, randomNumber }));
    onModalClose();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", }}>
      <Button variant="contained" onClick={handleSubmit}>
        Create my new avatar
      </Button>
    </Box>
  );
}

export default NewAvatar;
