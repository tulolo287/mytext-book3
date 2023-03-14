import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const cartSelector = (state: RootState) => state.cart;

export const cartSelectorMemo = createSelector([cartSelector], (cart) => cart);
