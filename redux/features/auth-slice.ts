"use client"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify"
import axios from "axios";
type InitialState = {
  registerData: any;
  homeData: any;
  isLoading: boolean;
  savedVideos: any;
  currentUser: any;
}
const getInitialState = (): InitialState => {
  if (typeof window !== "undefined") {
    return {
      registerData: localStorage.getItem("allUsers")
        ? JSON.parse(localStorage.getItem("allUsers") as string)
        : [],
      homeData: [],
      isLoading: true,
      savedVideos: localStorage.getItem("savedVideos")
        ? JSON.parse(localStorage.getItem("savedVideos") as string)
        : [],
      currentUser: localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser") as string)
        : null
    };
  }
  return {
    registerData: [],
    homeData: [],
    isLoading: true,
    savedVideos: [],
    currentUser: null
  };
};
export const getHomeData = createAsyncThunk("Home/getHomeData", async (userData, thunkAPI) => {
  try {
    const response = await axios.get('https://apis.ccbp.in/videos/all?search=', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`, // Include the JWT token in the Authorization header
      },
    });
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}) as any
export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    handleRegisterData: (state, action) => {
      const userExists = state.registerData.some((user: any) => user.email === action.payload.email);
      if (userExists) {
        toast.error("user already exists")
      }
      else {
        if (typeof window !== 'undefined') {
          state.registerData.push(action.payload)
          localStorage.setItem("allUsers", JSON.stringify(state.registerData))
          toast.success("User registered sucessfully")
        }
      }
    },
    handleLoginData: (state, action) => {
      const user = state.registerData.find((users: any) => users.email == action.payload.email && users.password == action.payload.password)
      if (user) {
        if (typeof window !== 'undefined') {
          state.currentUser = user
          localStorage.setItem("currentUser", JSON.stringify(state.currentUser))
          toast.success("User successfully logged in")
        }
      }
      else {
        toast.error("Details does not match")
      }
    },
    storedSavedVideos: (state, action) => {
      const video = state.savedVideos.some((vid: any) => vid.video_details.id === action.payload.video_details.id)
      if (!video) {
        state.savedVideos.push(action.payload)
        localStorage.setItem("savedVideos", JSON.stringify(state.savedVideos))
        toast.success("video saved sucessfully")
      }
      else {
        toast.info("video already saved")
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getHomeData.fulfilled, (state, action) => {
      state.homeData = action.payload
      state.isLoading = false
    })
  }
});
export const { handleRegisterData, handleLoginData, storedSavedVideos } = authSlice.actions;
export default authSlice.reducer;