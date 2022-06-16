import React from "react";
import EachUser from "./EachUser";
import { useSelector } from "react-redux";

const UsersList = ({ name, onEdit, onDelete }) => {
  const { currentUsers } = useSelector((state) => state.user);

  let usersList = currentUsers;
  console.log(currentUsers);

  if (usersList.length !== 0) {
    return (
      <ul>
        {usersList.map((item) => {
          return (
            <EachUser
              key={item.id}
              currentUser={item}
              onClick={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </ul>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default React.memo(UsersList);
