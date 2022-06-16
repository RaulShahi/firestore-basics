import { createSlice, configureStore } from "@reduxjs/toolkit";

import { validitySlice } from "./validity-slice";
import { formDataSlice } from "./formData-slice";
import { userSlice } from "./user-slice";

const editBtnSlice = createSlice({
  name: "editBtn",
  initialState: { edit: false },
  reducers: {
    setEdit(state, action) {
      state.edit = action.payload;
    },
  },
});

export const editBtnActions = editBtnSlice.actions;

export const store = configureStore({
  reducer: {
    validity: validitySlice.reducer,
    formData: formDataSlice.reducer,
    user: userSlice.reducer,
    editBtn: editBtnSlice.reducer,
  },
});
