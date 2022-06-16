import { useEffect } from "react";
import { fetchUsersList } from "./store/fetch-action";
import { useDispatch } from "react-redux/es/exports";
import { fetchUsers } from "./store/user-slice";
import Form from "./components/Form/Form";
function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchUsersList());
  // }, [dispatch]);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      <Form />
    </div>
  );
}

export default App;
