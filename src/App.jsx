import { HashRouter, Route, Routes } from 'react-router';

import NavBar from "./components/NavBar";
import Home from './pages/Home';
import TodoPage from "./pages/TodoPage";
import NotesPage from "./pages/NotesPage"
import CalendarPage from "./pages/CalendarPage"

import './App.css'

function App() {
	return <HashRouter>
		<NavBar />
		<Routes>
			<Route path="/" element={<Home/>}></Route>
			<Route path="/todo" element={<TodoPage/>}></Route>
			<Route path="/notes" element={<NotesPage/>}></Route>
			<Route path="/calendar" element={<CalendarPage/>}></Route>
		</Routes>
	</HashRouter>
}

export default App
