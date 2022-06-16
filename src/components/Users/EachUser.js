import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

const EachUser = (props) => {
  const dispatch = useDispatch();
  const keys = Object.keys(props.currentUser);
  const all = {
    ...props.currentUser,
  };
  let iD = all.id;

  const editHandler = () => {
    props.onClick(iD);
  };

  return (
    <div style={listStyle}>
      {keys.map((item) => {
        if (item !== "id") {
          return (
            <div key={item}>
              <li>{`${item.charAt(0).toUpperCase() + item.slice(1)}: ${
                all[item]
              }`}</li>
            </div>
          );
        }
      })}

      <div style={buttonDiv}>
        <button onClick={editHandler}>Edit</button>
        <button
          onClick={() => {
            dispatch(userActions.deleteUser(iD));
            props.onDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const listStyle = {
  border: "1px solid black",
  margin: "1rem",
  padding: "1rem",
  borderRadius: "10px",
};

const buttonDiv = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridGap: "1rem",
};

export default React.memo(EachUser);
