import {createAction} from "@reduxjs/toolkit";
import * as types from "../../constants/admin/index.js";


export const getAllTasks = createAction(types.GET_ALL_TASKS);
export const createTask = createAction(types.POST_TASK);
export const updateTask = createAction(types.PUT_TASK);
export const deleteTask = createAction(types.DELETE_TASK);

// update all state
export const updateAdminState = createAction(types.UPDATE_STATE);