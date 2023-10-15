import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isAuth: boolean;
  emailSignIn: string;
  name: string;
}

const initialState: UserState = {
  isAuth: false,
  emailSignIn: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuth = action.payload;
    },
    setCurrentEmail: (state, action) => {
      state.emailSignIn = action.payload;
    },
    setCurrentName: (state, action) => {
      state.name = action.payload;
    },
    logOut: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { loginSuccess, logOut, setCurrentName, setCurrentEmail } =
  userSlice.actions;

export default userSlice.reducer;
