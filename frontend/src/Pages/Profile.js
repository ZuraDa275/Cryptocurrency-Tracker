import ProfileBanner from "../components/ProfileBanner";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserDataStore from "../store/userDataStore";
import { shallow } from "zustand/shallow";
import axios from "axios";
import ProfileMain from "../components/ProfileMain";
import TrackedCryptoSection from "../components/TrackedCryptoSection";
import InvestmentSection from "../components/InvestmentSection";
import SocialSection from "../components/SocialSection";
import NotFound from "../components/NotFound";
import { CryptoState } from "../CryptoContext";

function Profile() {
  const [profileError, setProfileError] = useState();
  const { setError, setOpen } = CryptoState();
  const [section, setSection] = useState("Tracked Cryptos");
  const [userInfo, setUserInfo] = useState({
    username: "",
    trackedCryptos: [],
    following: [],
    followers: [],
    profile: "",
    investments: [],
  });
  const {
    username,
    trackedCryptos,
    followers,
    following,
    setFollowing,
    setFollowers,
  } = useUserDataStore(
    (state) => ({
      username: state.username,
      trackedCryptos: state.trackedCryptos,
      followers: state.followers,
      following: state.following,
      setFollowing: state.setFollowing,
      setFollowers: state.setFollowers,
    }),
    shallow
  );
  const { routeUsername } = useParams();
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`/api/user/${routeUsername}`);
        if (routeUsername === username) {
          setFollowing(response?.data?.following);
          setFollowers(response?.data?.followers);
        } else {
          setUserInfo({
            username: response?.data?.username,
            trackedCryptos: response?.data?.trackedCryptos,
            following: response?.data?.following,
            followers: response?.data?.followers,
            profile: response?.data?.profile,
            investments: response?.data?.investments,
          });
        }
      } catch (error) {
        setError(error?.response?.data?.msg);
        setProfileError(error?.response?.data?.msg);
        if (error?.response?.status) setOpen(true);
      }
    };
    getUserInfo();
  }, [routeUsername, username, setError, setOpen, setFollowers, setFollowing]);

  if (!profileError) {
    return (
      <>
        <ProfileBanner
          routeUsername={
            routeUsername === username ? username : userInfo.username
          }
          routeFollowing={userInfo.following}
          routeFollower={userInfo.followers}
          routeProfile={userInfo.profile}
        />
        <ProfileMain setSection={(e) => setSection(e.target.textContent)} />
        {section === "Tracked Cryptos" ? (
          <TrackedCryptoSection
            routeUsername={
              routeUsername === username ? username : userInfo.username
            }
            routeTrackedCryptos={
              routeUsername === username
                ? trackedCryptos
                : userInfo.trackedCryptos
            }
          />
        ) : section === "Investments" ? (
          <InvestmentSection
            routeUsername={
              routeUsername === username ? username : userInfo.username
            }
            routeCryptoWallet={userInfo.investments}
          />
        ) : (
          <SocialSection
            routeFollowing={
              routeUsername === username ? following : userInfo.following
            }
            routeFollower={
              routeUsername === username ? followers : userInfo.followers
            }
          />
        )}
      </>
    );
  } else {
    return <NotFound />;
  }
}

export default Profile;
