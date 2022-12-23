import { useState } from "react";
import { Route, Routes } from "react-router";
import { Vote } from "./pages/Vote";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DataProvider } from "./context/DataContext";

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<ProtectedRoute redirectPath='/login'>
						<DataProvider>
							<Vote />
						</DataProvider>
					</ProtectedRoute>
				}
			/>
			<Route path='/login' element={<Login />} />
		</Routes>
	);
}

export default App;
