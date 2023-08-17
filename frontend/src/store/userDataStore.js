import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userDataFunction = (set) => ({
  username: "",
  setUsername: (username) => set({ username }),
  cryptoBucks: "",
  setCryptoBucks: (cryptoBucks) => set({ cryptoBucks }),
  trackedCryptos: [],
  setTrackedCryptos: (trackedCryptos) => set({ trackedCryptos }),
  cryptoUpdates: [],
  setCryptoUpdates: (newCryptoUpdate) =>
    set((state) => ({
      cryptoUpdates: [newCryptoUpdate, ...state.cryptoUpdates],
    })),
  following: [],
  setFollowing: (following) => set({ following }),
  followers: [],
  setFollowers: (followers) => set({ followers }),
  profileImage: "",
  setProfileImage: (profileImage) => set({ profileImage }),
  cryptoWallet: [],
  setCryptoWallet: (cryptoWallet) => set({ cryptoWallet }),
  investmentUpdates: [],
  setInvestmentUpdates: (newUpdate) =>
    set((state) => ({
      investmentUpdates: [newUpdate, ...state.investmentUpdates],
    })),
});

const useUserDataStore = create(
  devtools(
    persist(userDataFunction, {
      name: "user-data",
    })
  )
);

export default useUserDataStore;
