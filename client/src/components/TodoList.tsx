import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import TodoItem from './TodoItem';
import { API_BASE_URL } from '../App';

export type TodoType = {
	_id: number;
	title: string;
	completed: boolean;
};
export default function TodoList() {
	const { data: todos, isLoading } = useQuery<TodoType[]>({
		queryKey: ['todos'],
		queryFn: async () => {
			try {
				const response = await fetch(`${API_BASE_URL}/todos`);

				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error || 'Something went wrong');
				}

				return data || [];
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<>
			<Text
				fontSize={'4xl'}
				textTransform={'uppercase'}
				fontWeight={'bold'}
				textAlign={'center'}
				my={2}
			>
				Today's Tasks
			</Text>
			{isLoading && (
				<Flex justifyContent={'center'} my={4}>
					<Spinner size={'xl'} />
				</Flex>
			)}
			{!isLoading && todos?.length === 0 && (
				<Stack alignItems={'center'} gap="3">
					<Text
						fontSize={'xl'}
						textAlign={'center'}
						color={'gray.500'}
					>
						All tasks completed! 🤞
					</Text>
					<img src="/go.png" alt="Go logo" width={70} height={70} />
				</Stack>
			)}
			<Stack gap={3}>
				{todos?.map((todo) => (
					<TodoItem key={todo._id} todo={todo} />
				))}
			</Stack>
		</>
	);
}
