import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  id: number;
  email: string;
  phone: string;
  gender: string;
  fullname: string;
  birthday: Date | string | undefined;
  address: string;
  roleId?: number;
  avatar?: string;
  roles: string[];
  role: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  id: 0,
  email: "",
  phone: "",
  gender: "",
  fullname: "",
  birthday: undefined,
  address: "",
  roleId: 2,
  avatar: "",
  roles: [],
  role: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<AuthState>>) => {
      if (action.payload.id !== undefined) state.id = action.payload.id;
      if (action.payload.email !== undefined) state.email = action.payload.email;
      if (action.payload.phone !== undefined) state.phone = action.payload.phone;
      if (action.payload.gender !== undefined) state.gender = action.payload.gender;
      if (action.payload.fullname !== undefined) state.fullname = action.payload.fullname;
      if (action.payload.birthday !== undefined) state.birthday = action.payload.birthday;
      if (action.payload.address !== undefined) state.address = action.payload.address;
      if (action.payload.avatar !== undefined) state.avatar = action.payload.avatar;
      if (action.payload.roleId !== undefined) {
        state.roleId = action.payload.roleId;
        if (action.payload.roleId === 1) {
          state.role = "ADMIN";
          state.roles = ["ROLE_ADMIN", "ADMIN"];
        } else {
          state.role = "CUSTOMER";
          state.roles = ["ROLE_CUSTOMER", "CUSTOMER"];
        }
      }
      if (action.payload.roles !== undefined) state.roles = action.payload.roles;
      if (action.payload.role !== undefined) state.role = action.payload.role;
      state.isAuthenticated = Boolean(state.email || state.id);
    },
    updateUserState: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload);
      state.isAuthenticated = Boolean(state.email || state.id);
    },
    logout: (state) => {
      state.id = 0;
      state.email = "";
      state.phone = "";
      state.gender = "";
      state.fullname = "";
      state.birthday = undefined;
      state.address = "";
      state.roleId = 2;
      state.avatar = "";
      state.roles = [];
      state.role = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout, updateUserState } = authSlice.actions;
export default authSlice.reducer;
