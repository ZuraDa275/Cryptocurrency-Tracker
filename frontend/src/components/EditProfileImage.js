import { useState, useRef, useEffect } from "react";
import { makeStyles, Avatar, Tooltip } from "@material-ui/core";
import { useAxiosAuthInstance } from "../hooks/axiosAuthInstance";
import useUserDataStore from "../store/userDataStore";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    marginLeft: -200,
    marginTop: 70,
  },
}));

function ImageAvatar() {
  const [profileChange, setProfileChange] = useState(false);
  const { setResponse, setOpen, setError } = CryptoState();
  const setProfileImage = useUserDataStore((state) => state.setProfileImage);
  const username = useUserDataStore((state) => state.username);
  const profileImage = useUserDataStore((state) => state.profileImage);
  const axiosInstance = useAxiosAuthInstance();
  const classes = useStyles();
  const [compProfile, setCompProfile] = useState("");
  const imageUploader = useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompProfile(e.target.result);
        setProfileImage(e.target.result);
        setProfileChange(true);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (profileChange) {
      const addProfileImage = async () => {
        try {
          const response = axiosInstance.post("/api/user/add-profile-image", {
            profileImage: compProfile,
          });
          setResponse(response?.data?.msg);
          if (response?.status) {
            setOpen(true);
            setCompProfile("");
            setProfileChange(false);
          }
        } catch (error) {
          setError(error?.response?.data?.msg);
          if (error?.response?.status) setOpen(true);
        }
      };
      addProfileImage();
    }
  }, [
    axiosInstance,
    setError,
    compProfile,
    profileChange,
    setOpen,
    setResponse,
  ]);
  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={() => imageUploader.current.click()}
    >
      <input
        type="file"
        accept="image/*"
        multiple={false}
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none",
        }}
      />
      <Tooltip
        placement="top"
        title={
          <h1 style={{ color: "white", padding: ".5em" }}>
            Click to Edit Profile Image
          </h1>
        }
        arrow
      >
        <Avatar alt={username} src={profileImage} className={classes.large} />
      </Tooltip>
    </div>
  );
}

export default ImageAvatar;
