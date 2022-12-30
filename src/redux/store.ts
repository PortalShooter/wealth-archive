import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./reducers/modalReducer/reducer";
import { animationReducer } from "./reducers/animationReducer/reducer";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    animation:animationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
