import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../config";
import {
  collection,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export const addUser = createAsyncThunk("users/addUser", async (payload) => {
  const response = await addDoc(collection(db, "users"), payload);
  return { id: response.id, payload };
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  let users = [];
  querySnapshot.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });
  });
  console.log(users);
  const transformedData = users.map((item) => {
    return {
      name: item.name,
      age: item.age,
      contact: item.contact,
      id: item.id,
      email: item.email,
    };
  });
  return transformedData;
});

export const editUser = createAsyncThunk("users/editUser", async (payload) => {
  const { name, age, contact, email, id } = payload;
  await setDoc(doc(db, "users", id), {
    name,
    age,
    contact,
    email,
  });
  return payload;
});

export const userSlice = createSlice({
  name: "user",
  initialState: { currentUsers: [] },
  reducers: {
    // setUsers(state, action) {
    //   return {
    //     ...state,
    //     currentUsers: action.payload,
    //   };
    // },
    editUser(state, action) {
      const { name, age, contact, email, id } = action.payload;
      console.log(action.payload);
      const updateDoc = async () => {
        await setDoc(doc(db, "users", id), {
          name,
          age,
          contact,
          email,
        });
      };
      try {
        updateDoc();
      } catch (error) {
        console.log("Cant update user");
      }
      return {
        ...state,
        currentUsers: state.currentUsers.map((item) => {
          if (item.id !== action.payload.id) {
            return item;
          } else {
            return {
              name,
              age,
              contact,
              email,
              id,
            };
          }
        }),
      };
    },
    deleteUser(state, action) {
      console.log(action.payload);
      const deleteSpecificUser = async () => {
        await deleteDoc(doc(db, "users", action.payload));
      };
      try {
        deleteSpecificUser();
      } catch (error) {
        console.log("Error in deleting");
      }
      return {
        ...state,
        currentUsers: state.currentUsers.filter(
          (item) => action.payload !== item.id
        ),
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addUser.pending, (state, action) => {
        console.log("loading");
        // state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        // state.status = "succeeded";
        const { id, payload } = action.payload;
        // Add any fetched posts to the array
        state.currentUsers = state.currentUsers.concat({ ...payload, id });
      })
      .addCase(addUser.rejected, (state, action) => {
        console.log("failed");

        // state.status = "failed";
        // state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state, action) => {
        console.log("loading");
        // state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // state.status = "succeeded";
        console.log(action.payload);
        // Add any fetched posts to the array
        state.currentUsers = state.currentUsers.concat(action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log("failed");

        // state.status = "failed";
        // state.error = action.error.message;
      })
      .addCase(editUser.pending, (state, action) => {
        console.log("loading");
        // state.status = "loading";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        // state.status = "succeeded";
        console.log(action.payload);
        const { name, age, contact, email, id } = action.payload;
        return {
          ...state,
          currentUsers: state.currentUsers.map((item) => {
            if (item.id !== action.payload.id) {
              return item;
            } else {
              return {
                name,
                age,
                contact,
                email,
                id,
              };
            }
          }),
        };
        // Add any fetched posts to the array
      })
      .addCase(editUser.rejected, (state, action) => {
        console.log("failed");

        // state.status = "failed";
        // state.error = action.error.message;
      });
  },
});

export const userActions = userSlice.actions;
