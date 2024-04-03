import {createAction} from "@reduxjs/toolkit";
import * as types from "../../constants/auth/index.js";

// template for all actions
export const postSignIn = createAction(types.POST_SIGNIN);
export const postSignUp = createAction(types.POST_SIGNUP);
export const getUserMe = createAction(types.GET_USER_ME);

// update auth state;
export const updateAuthState = createAction(types.UPDATE_AUTH_STATE);