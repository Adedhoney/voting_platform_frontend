import { Navigate, Outlet } from "react-router-dom";
import { useDataContext } from "../context/DataContext";

export const ProtectedRoute = ({
	redirectPath = "/login",
	children,
}: {
	redirectPath?: string;
	children?: React.ReactElement;
}) => {
	const loggedIn = localStorage.getItem("token");

	if (!loggedIn) return <Navigate to={redirectPath} replace />;

	return children ? children : <Outlet />;
};

export const HasVotedRoute = ({
	redirectPath = "/success",
	children,
}: {
	redirectPath?: string;
	children?: React.ReactElement;
}) => {
	const { user } = useDataContext();
	const hasnotvoted = true;
	// if (user?.vote_status) return <Navigate to={redirectPath} replace />;
	return children ? children : <Outlet />;
};
