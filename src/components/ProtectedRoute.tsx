import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
	redirectPath = "/",
	children,
}: {
	redirectPath?: string;
	children?: React.ReactElement;
  }) => {
  const loggedin = true;

  if (!loggedin) {
    // alert("you are not logged in, you need to log in")
		return <Navigate to={redirectPath} replace />;
	}
	return children ? children : <Outlet />;
};
