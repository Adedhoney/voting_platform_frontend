import { Route, Routes } from "react-router";
import { HasVotedRoute, ProtectedRoute } from "./components/ProtectedRoute";
import { DataProvider } from "./context/DataContext";
import { Confirmation } from "./pages/Confirmation";
import { Error } from "./pages/Error";
import { Login } from "./pages/Login";
import { Success } from "./pages/Success";
import { Vote } from "./pages/Vote";

function App() {
	return (
		<Routes>
			<Route path='/' element={<ProtectedRoute />}>
				<Route
					index
					element={
						<DataProvider>
							<HasVotedRoute>
								<Vote />
							</HasVotedRoute>
						</DataProvider>
					}
				/>
				<Route
					path='confirmation'
					element={
						<DataProvider>
							<HasVotedRoute>
								<Confirmation />
							</HasVotedRoute>
						</DataProvider>
					}
				/>
				<Route
					path='success'
					element={
						<DataProvider>
							<Success />
						</DataProvider>
					}
				/>
			</Route>
			<Route path='/login' element={<Login />} />
			<Route path='*' element={<Error />} />
		</Routes>
	);
}

export default App;
