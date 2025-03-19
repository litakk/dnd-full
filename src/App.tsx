import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Task from "./pages/Task";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route 	path="/todos/:id" element={<Task/>}/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
