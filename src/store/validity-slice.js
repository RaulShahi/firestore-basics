import { createSlice } from "@reduxjs/toolkit";

export const validitySlice = createSlice({
  name: "validity",
  initialState: {
    name: null,
    age: null,
    contact: null,
    email: null,
  },
  reducers: {
    name(state, action) {
      const hasNumber = /\d/;
      return {
        ...state,
        name:
          action.payload.val.trim() !== "" &&
          !hasNumber.test(action.payload.val),
      };
    },
    age(state, action) {
      return {
        ...state,
        age:
          action.payload.val.trim() !== "" &&
          !isNaN(action.payload.val) &&
          action.payload.val > 0 &&
          action.payload.val.length < 3,
      };
    },
    email(state, action) {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return {
        ...state,
        email: emailRegex.test(action.payload.val),
      };
    },
    contact(state, action) {
      return {
        ...state,
        contact:
          action.payload.val.trim() !== "" &&
          !isNaN(action.payload.val) &&
          action.payload.val.length === 10,
      };
    },
    allTrue(state) {
      return {
        ...state,
        name: true,
        age: true,
        contact: [{ contactNo: true }, { phoneNo: true }, { officeNo: true }],
        email: true,
      };
    },
    clear(state) {
      return {
        ...state,
        name: null,
        age: null,
        contact: null,
        email: null,
        category: null,
      };
    },
  },
});

export const validityActions = validitySlice.actions;
