import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    loginSuccess: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setCurrentEmail: (state, action: PayloadAction<string>) => {
      state.emailSignIn = action.payload;
    },
    setCurrentName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    logOut: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { loginSuccess, logOut, setCurrentName, setCurrentEmail } =
  userSlice.actions;

export default userSlice.reducer;
