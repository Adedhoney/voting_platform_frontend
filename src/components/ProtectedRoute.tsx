import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
	redirectPath = "/login",
	children,
}: {
	redirectPath?: string;
	children?: React.ReactElement;
	}) => {
	const loggedIn = localStorage.getItem("token");

	if (!loggedIn) {
		return <Navigate to={redirectPath} replace />;
	}

	return children ? children : <Outlet />;
};
