import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { TaskContext } from "context/TaskContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(TaskContext)
 

  return (
    <Route
      {...rest}
      render={(props) =>
        state.loading ? (
          <h1>Loading...</h1>
        ) : state.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};



export default PrivateRoute;