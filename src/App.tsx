import { useState } from "react";
import { Route, Routes } from "react-router";
import { Vote } from "./pages/Vote";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DataProvider } from "./context/DataContext";
import { Confirmation } from "./pages/Confirmation";

function App() {
	return (
		<Routes>
			<Route path='/' element={<ProtectedRoute />}>
				<Route
					index
					element={
						<DataProvider>
							<Vote />
						</DataProvider>
					}
				/>
				<Route
					path='confirmation'
					element={
						<DataProvider>
							<Confirmation />
						</DataProvider>
					}
				/>
			</Route>
			<Route path='/login' element={<Login />} />
			<Route path='*' element={<div>Error</div>} />
		</Routes>
	);
}

export default App;
