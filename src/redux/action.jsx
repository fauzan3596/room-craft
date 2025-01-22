import { onAuthStateChanged, signOut } from "firebase/auth";
import { logout, userStart, userSuccess } from "./slice/userSlice";
import { auth } from "../config/firebase";

export const authState = () => (dispatch) => {
  dispatch(userStart());
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(userSuccess({ uid: user.uid, email: user.email }));
    } else {
      dispatch(logout());
    }
  });
};

export const userLogOut = () => async (dispatch) => {
  await signOut(auth);
  dispatch(logout());
};
