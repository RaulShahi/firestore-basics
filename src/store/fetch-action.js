import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

import { userActions } from "./user-slice";

export const fetchUsersList = () => {
  return async (dispatch) => {
    const fetchUsers = async () => {
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
    };

    try {
      const users = await fetchUsers();
      dispatch(userActions.setUsers(users));
    } catch (error) {
      return;
    }
  };
};
