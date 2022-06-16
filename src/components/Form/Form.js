import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formDataActions } from "../../store/formData-slice";
import { validityActions } from "../../store/validity-slice";
import { editBtnActions } from "../../store/store";
import FormComponent from "./FormComponent";
import UsersList from "../Users/UsersList";

import Card from "../UI/Card/Card";
import classes from "../Users/UsersList.module.css";

const Form = () => {
  const formData = useSelector((state) => state.formData);
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [searchedName, setSearchedName] = useState("");

  const editHandler = useCallback(
    (iD) => {
      dispatch(editBtnActions.setEdit(true));
      const updateUser = userData.currentUsers.find((item) => item.id === iD);
      console.log("updateUser", updateUser);
      dispatch(formDataActions.update(updateUser));
      console.log("In edit", formData);
      dispatch(validityActions.allTrue());
    },
    [userData]
  );
  const deleteHandler = useCallback((event) => {
    dispatch(editBtnActions.setEdit(false));
  });

  const searchHandler = useCallback(
    (event) => {
      setSearchedName((prevState) => {
        prevState = event.target.value;
        return prevState;
      });
    },
    [searchedName]
  );

  return (
    <div className="allThree">
      <FormComponent />
      <Card className={classes.words}>
        <h2>Users List</h2>
        <UsersList
          onEdit={editHandler}
          onDelete={deleteHandler}
          name={searchedName}
        />
      </Card>
    </div>
  );
};

export default Form;
