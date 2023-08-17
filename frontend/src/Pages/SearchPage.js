import { useState } from "react";
import { useAxiosAuthInstance } from "../hooks/axiosAuthInstance";
import SearchIcon from "@material-ui/icons/Search";
import {
  makeStyles,
  InputBase,
  alpha,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import { CryptoState } from "../CryptoContext";

const skeletonMap = [1, 2, 3, 4, 5, 6];

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
      "&:focus": {
        width: "60ch",
      },
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginTop: "5em",
    marginBottom: "3em",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  profileImage: {
    width: "50px",
    height: "50px",
  },
}));

function SearchPage() {
  const axiosInstance = useAxiosAuthInstance();
  let history = useHistory();
  const classes = useStyles();
  const [userList, setUserList] = useState([]);
  const [status, setStatus] = useState(0);
  const { setError, setOpen } = CryptoState();

  const handleSearch = async (search) => {
    if (search) {
      try {
        const response = await axiosInstance.post("/api/user/user-list", {
          search,
        });
        if (response?.status) {
          setStatus(response?.status);
        }
        setUserList(response?.data?.userList);
      } catch (error) {
        setError(error?.response?.data?.msg);
        if (error?.response?.status) setOpen(true);
      }
    } else {
      setUserList("");
      setStatus(0);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search Users…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          style={{
            color: "white",
            fontSize: "1.5rem",
            fontFamily: "quicksand",
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => {
            setStatus(1);
            handleSearch(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          width: "80%",
          rowGap: "5ch",
        }}
      >
        {userList &&
          userList.map((list) => (
            <Grid
              item
              xs={10}
              onClick={() => history.push(`/user/${list?.username}`)}
              style={{ cursor: "pointer" }}
              key={list?.id}
            >
              <Card>
                <CardMedia
                  style={{ width: "100%", height: "300px" }}
                  component="img"
                  image={list?.profile?.profileImage}
                  alt={list?.username}
                />
                <CardContent
                  style={{
                    color: "white",
                    background: "#424242",
                    padding: ".5rem",
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{ textAlign: "center", fontFamily: "Raleway" }}
                  >
                    {list?.username}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        {status === 1 &&
          skeletonMap.map((_) => (
            <Skeleton
              style={{ background: "#424242" }}
              variant="rect"
              width={317}
              height={250}
            />
          ))}
      </div>
    </div>
  );
}

export default SearchPage;
