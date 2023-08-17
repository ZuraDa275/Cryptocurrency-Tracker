import {
  Container,
  makeStyles,
  Typography,
  Button,
  Chip,
  Avatar,
} from "@material-ui/core";
import useUserDataStore from "../store/userDataStore";
import { useAxiosAuthInstance } from "../hooks/axiosAuthInstance";
import { CryptoState } from "../CryptoContext";
import ImageAvatar from "./EditProfileImage";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(https://i.imgur.com/jYy2zlE.jpg)",
  },
  bannerContent: {
    height: 350,
    display: "flex",
    flexDirection: "column",
    paddingTop: 40,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    marginLeft: -200,
    marginTop: 70,
  },
  follow: {
    color: "white",
    background: "#f50057",
    fontFamily: "Quicksand",
  },
}));

function ProfileBanner({
  routeUsername,
  routeFollowing,
  routeFollower,
  routeProfile,
}) {
  const { setResponse, setError, setOpen } = CryptoState();
  const axiosInstance = useAxiosAuthInstance();
  const classes = useStyles();
  const username = useUserDataStore((state) => state.username);
  const following = useUserDataStore((state) => state.following);
  const followers = useUserDataStore((state) => state.followers);
  const setFollowing = useUserDataStore((state) => state.setFollowing);
  const setFollowers = useUserDataStore((state) => state.setFollowers);

  const handleAddFollow = async () => {
    try {
      const response = await axiosInstance.post("/api/follows/add-follow", {
        followingUserName: routeUsername,
        profileImage: routeProfile,
      });
      setResponse(response?.data?.msg);
      setFollowing(response?.data?.following);
      setFollowers(response?.data?.followers);
      if (response?.status) {
        setOpen(true);
      }
    } catch (error) {
      setError(error?.response?.data?.msg);
      if (error?.response?.status) setOpen(true);
    }
  };
  const handleDeleteFollow = async () => {
    try {
      const response = await axiosInstance.post("/api/follows/delete-follow", {
        followingUserName: routeUsername,
      });
      setResponse(response?.data?.msg);
      setFollowing(response?.data?.following);
      setFollowers(response?.data?.followers);
      if (response?.status) {
        setOpen(true);
      }
    } catch (error) {
      setError(error?.response?.data?.msg);
      if (error?.response?.status) setOpen(true);
    }
  };
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {username === routeUsername ? (
            <ImageAvatar />
          ) : (
            <Avatar
              alt={routeUsername}
              src={routeProfile}
              className={classes.large}
            />
          )}
          <Typography
            variant="h3"
            style={{
              fontWeight: "bold",
              marginLeft: 50,
              marginTop: 220,
              fontFamily: "Quicksand",
            }}
          >
            {routeUsername}
          </Typography>
          &nbsp; &nbsp;
          {routeUsername === username
            ? followers.find(
                (fo) => fo?.followersUserName === routeUsername
              ) && (
                <Chip
                  label="Follows You"
                  className={classes.follow}
                  style={{ alignSelf: "flex-end", marginBottom: 40 }}
                />
              )
            : routeFollowing.find(
                (fo) => fo?.followingUserName === username
              ) && (
                <Chip
                  label="Follows You"
                  className={classes.follow}
                  style={{ alignSelf: "flex-end", marginBottom: 40 }}
                />
              )}
          {routeUsername !== username ? (
            following.filter((fo) => fo?.followingUserName === routeUsername)
              .length === 0 ? (
              <Button
                variant="contained"
                size="large"
                className={classes.follow}
                style={{
                  marginLeft: "auto",
                  marginBottom: 30,
                  fontFamily: "Quicksand",
                  alignSelf: "flex-end",
                }}
                onClick={handleAddFollow}
              >
                Follow
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                className={classes.follow}
                style={{
                  marginLeft: "auto",
                  marginBottom: 30,
                  fontFamily: "Quicksand",
                  alignSelf: "flex-end",
                }}
                onClick={handleDeleteFollow}
              >
                Unfollow
              </Button>
            )
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
}

export default ProfileBanner;
