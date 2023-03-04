import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {musicReducer} from "./music/musicReducer";

const middleware = [...getDefaultMiddleware({ thunk: false })];

//using redux ToolKit
const store = configureStore({
    reducer: {
music:musicReducer
    },
    // devTools: process.env.NODE_ENV !== "production",
    middleware,
});

export type ReducersType = ReturnType<typeof store.getState>;
export default store;