import { Container, Stack } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export const API_BASE_URL =
	import.meta.env.MODE === 'development'
		? 'http://localhost:3000/api'
		: '/api';
export default function App() {
	return (
		<Stack h="100vh">
			<Navbar />
			<Container>
				<TodoForm />
				<TodoList />
			</Container>
		</Stack>
	);
}
