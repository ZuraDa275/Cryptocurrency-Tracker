import { useHistory } from "react-router-dom";
import FourOFour from "../404.png";
import { Typography, Button } from "@material-ui/core";

function NotFound() {
  let history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img style={{ minWidth: "30%" }} src={FourOFour} alt="404 error" />
      <Typography
        style={{ color: "gold", fontFamily: "Quicksand", marginBottom: "1rem" }}
        variant="h1"
      >
        PAGE NOT FOUND
      </Typography>
      <Button
        variant="outlined"
        style={{ fontSize: "1.4rem", color: "red", border: "2px solid red" }}
        onClick={() => history.push("/")}
      >
        GO BACK
      </Button>
    </div>
  );
}

export default NotFound;
