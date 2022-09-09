import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  login: null,
  token: null,
  isLoading: false,
  status: null,
};

// Register
export const registerUser = createAsyncThunk("/registerUser", async ({ login, password }) => {
  try {
    const { data } = await axios.post("/register", {
      login,
      password,
    });
    if (data.token) {
      window.localStorage.setItem("token", data.token);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
});

// Login
export const loginUser = createAsyncThunk("/loginUser", async ({ login, password }) => {
  try {
    const { data } = await axios.post("/login", {
      login,
      password,
    });
    if (data.token) {
      window.localStorage.setItem("token", data.token);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
});

// Get me
export const getMe = createAsyncThunk("/loginUser", async () => {
  try {
    const { data } = await axios.get("/me");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.login = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: {
    // Get Me
    [getMe.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.login = action.payload?.login;
      state.token = action.payload?.token;
    },
    [getMe.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },

    // Register
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.login = action.payload.login;
      state.token = action.payload.token;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },

    // Login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.login = action.payload.login;
      state.token = action.payload.token;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
