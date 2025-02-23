import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";

const appStore= configureStore({
    reducer:{
        userReducer,
        feedReducer
    }
});

export default appStore;