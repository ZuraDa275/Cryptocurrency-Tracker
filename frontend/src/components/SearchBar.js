import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

export default function SearchBar() {
  let history = useHistory();
  return (
    <div>
      <SearchIcon
        fontSize="large"
        style={{
          color: "gold",
          transform: "translateX(15px)",
          cursor: "pointer",
        }}
        onClick={() => history.push("/search")}
      />
    </div>
  );
}
