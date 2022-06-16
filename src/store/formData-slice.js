import { createSlice } from "@reduxjs/toolkit";

export const formDataSlice = createSlice({
  name: "formData",
  initialState: {
    name: "",
    age: "",
    contact: "",
    email: "",
  },
  reducers: {
    userInput(state, action) {
      return {
        ...state,
        [action.payload.name]: action.payload.val,
      };
    },
    update(state, action) {
      return {
        name: action.payload.name,
        age: action.payload.age,
        contact: action.payload.contact,
        email: action.payload.email,
        id: action.payload.id,
      };
    },
    submit(state) {
      return {
        name: "",
        age: "",
        contact: "",
        email: "",
      };
    },
  },
});

export const formDataActions = formDataSlice.actions;
