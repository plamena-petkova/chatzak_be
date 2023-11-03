import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box } from "@mui/joy";
//import { setAvatar, updateUsersAvatar } from "../store/authReducer";
//import axios from "axios";

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

function InputFileUpload({onModalClose}) {
  //const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);

  const avatar = useSelector((state) => state.auth.avatarUrl);
  const currentUser = useSelector((state) => state.auth.user);

  //console.log('Avatar', avatar, 'Current', currentUser);

  //const dataForUpdate = { currentUser, avatar };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const sendPhoto = async () => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("photo", selectedFile);

      //console.log("Data", selectedFile);

      /*
      const response = await axios.post(
        "https://public-api.mirror-ai.net/v2/generate?style=kenga",
        bodyFormData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
            "X-Token": "196b61b29bb442fc9fd97a7b187ea63e",
          },
        }
      );
    */

      //dispatch(setAvatar(response.data.face.url));
      //dispatch(updateUsersAvatar(dataForUpdate));

      console.log('Send photo');

    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      sendPhoto();
      onModalClose();
    } else {
      alert("Please select a file.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button component="label" startIcon={<CloudUploadIcon />}>
        Upload
        <VisuallyHiddenInput onChange={handleFileChange} type="file" />
      </Button>
      <Button variant="contained" onClick={handleSubmit}>
        Get my avatar
      </Button>
    </Box>
  );
}

export default InputFileUpload;
