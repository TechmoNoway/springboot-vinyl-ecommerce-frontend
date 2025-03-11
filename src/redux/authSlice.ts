import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  id: number;
  email: string;
  avatarUrl: string;
  phone: string;
  gender: string;
  fullname: string;
  birthday: Date | undefined;
  address: string;
}

const initialState: AuthState = {
  id: 0,
  email: "",
  avatarUrl: "",
  phone: "",
  gender: "",
  fullname: "",
  birthday: undefined,
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
      state.birthday = action.payload.birthday;
      state.address = action.payload.address;
    },
    updateUserState: (
      state,
      action: PayloadAction<Partial<AuthState>>
    ) => {
      const {
        id,
        email,
        avatarUrl,
        phone,
        gender,
        fullname,
        birthday,
        address,
      } = action.payload;
      if (id !== undefined) {
        state.id = id;
      }
      if (email !== undefined) {
        state.email = email;
      }
      if (avatarUrl !== undefined) {
        state.avatarUrl = avatarUrl;
      }
      if (phone !== undefined) {
        state.phone = phone;
      }
      if (gender !== undefined) {
        state.gender = gender;
      }
      if (fullname !== undefined) {
        state.fullname = fullname;
      }
      if (birthday !== undefined) {
        state.birthday = birthday;
      }
      if (address !== undefined) {
        state.address = address;
      }
    },
    logout: (state) => {
      state.id = 0;
      state.email = "";
      state.avatarUrl = "";
      state.phone = "";
      state.gender = "";
      state.fullname = "";
      state.birthday = undefined;
      state.address = "";
    },
  },
});

export const { setUser, logout, updateUserState } = authSlice.actions;
export default authSlice.reducer;
