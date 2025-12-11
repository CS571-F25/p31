import { HashRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import AuthRedirect from "./components/AuthRedirect";

import Home from "./pages/Home";
import TodoPage from "./pages/TodoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Overdue from "./pages/Overdue";
import Completed from "./pages/Completed";
import PastEvents from "./pages/PastEvents";

function App() {
	return (
		<HashRouter>
		<NavBar />
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			<Route
			path="/"
			element={
				<AuthRedirect>
				<Home />
				</AuthRedirect>
			}
			/>
			<Route
			path="/todo"
			element={
				<AuthRedirect>
				<TodoPage />
				</AuthRedirect>
			}
			/>
			<Route
			path="/overdue"
			element={
				<AuthRedirect>
				<Overdue />
				</AuthRedirect>
			}
			/>
			<Route
			path="/completed"
			element={
				<AuthRedirect>
				<Completed />
				</AuthRedirect>
			}
			/>
			<Route
			path="/pastevents"
			element={
				<AuthRedirect>
				<PastEvents />
				</AuthRedirect>
			}
			/>
		</Routes>
		</HashRouter>
	);
}

export default App;
