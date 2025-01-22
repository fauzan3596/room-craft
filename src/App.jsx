import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authState } from "./redux/action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authState());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
