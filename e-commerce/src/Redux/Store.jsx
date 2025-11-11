import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Slices/CartSlice";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load cart", e);
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch (e) {
    console.warn("Could not save cart", e);
  }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveToLocalStorage({
    cart: store.getState().cart,
  });
});

export default store;
