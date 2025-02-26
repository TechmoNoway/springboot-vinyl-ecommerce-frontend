import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  id: number;
  email: string;
  avatarUrl: string;
  phone: string;
  gender: string;
  fullname: string;
  birthdate: string;
  address: string;
}

const initialState: AuthState = {
  id: 0,
  email: "",
  avatarUrl: "",
  phone: "",
  gender: "",
  fullname: "",
  birthdate: "",
  address: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
      state.fullname = action.payload.fullname;
      state.birthdate = action.payload.birthdate;
      state.address = action.payload.address;
    },
    logout: (state) => {
      state.id = 0;
      state.email = "";
      state.avatarUrl = "";
      state.phone = "";
      state.gender = "";
      state.fullname = "";
      state.birthdate = "";
      state.address = "";
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
