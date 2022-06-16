import { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../Input/Input";
import { useSelector, useDispatch } from "react-redux";
import { formDataActions } from "../../store/formData-slice";
import { addUser, userActions } from "../../store/user-slice";
import { validityActions } from "../../store/validity-slice";
import { editBtnActions } from "../../store/store";
import { editUser } from "../../store/user-slice";

const FormComponent = () => {
  const validity = useSelector((state) => state.validity);
  const formData = useSelector((state) => state.formData);
  const edit = useSelector((state) => state.editBtn.edit);
  const dispatch = useDispatch();

  const [formIsTouched, setFormIsTouched] = useState(false);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setFormIsTouched(true);
    const { name, age, contact, email } = validity;
    if (!name || !age || !email || !contact) {
      return;
    }
    if (!edit) {
      dispatch(addUser(formData));
    } else {
      // dispatch(userActions.editUser(formData));
      dispatch(editUser(formData));
      dispatch(editBtnActions.setEdit(false));
    }
    dispatch(formDataActions.submit());
    dispatch(validityActions.clear());
    setFormIsTouched(false);
  };

  const changeHandler = (event) => {
    const fieldName = event.target.name.toUpperCase();
    dispatch(
      formDataActions.userInput({
        val: event.target.value,
        name: event.target.name,
      })
    );

    switch (fieldName) {
      case "NAME":
        dispatch(
          validityActions.name({
            val: event.target.value,
          })
        );
        break;

      case "AGE":
        dispatch(
          validityActions.age({
            val: event.target.value,
          })
        );
        break;

      case "CONTACT":
        dispatch(
          validityActions.contact({
            val: event.target.value,
          })
        );
        break;

      case "EMAIL":
        dispatch(
          validityActions.email({
            val: event.target.value,
          })
        );
        break;

      default: {
        return;
      }
    }
  };

  const type = edit ? "Edit" : "Submit";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <Input
          id="name"
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={changeHandler}
        />
        {formIsTouched && !validity.name && (
          <p style={paraStyle}>Please Enter a Valid Name.</p>
        )}
        <Input
          id="age"
          label="Age"
          type="text"
          value={formData.age}
          name="age"
          onChange={changeHandler}
        />
        {formIsTouched && !validity.age && (
          <p style={paraStyle}>Please Enter a Valid Age.</p>
        )}

        <Input
          id="contact"
          label="Contact Number"
          type="text"
          value={formData.contact}
          name="contact"
          onChange={changeHandler}
        />
        {formIsTouched && !validity.contact && (
          <p style={paraStyle}>Please Enter a Valid Contact Number</p>
        )}

        <Input
          id="email"
          label="E-Mail Address"
          type="text"
          name="email"
          value={formData.email}
          onChange={changeHandler}
        />
        {formIsTouched && !validity.email && (
          <p style={paraStyle}>Please Enter a Valid Email.</p>
        )}

        <div className="form-actions">
          <Button type="submit">{type}</Button>
        </div>
      </div>
    </form>
  );
};
const paraStyle = {
  color: "red",
};

export default FormComponent;
