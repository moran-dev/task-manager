import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      completed
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask($title: String!) {
    addTask(title: $title) {
      id
      title
      completed
    }
  }
`;
const TaskManager: React.FC = () => {
  const { data, loading } = useQuery(GET_TASKS);
  const [addTask] = useMutation(ADD_TASK);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h1>Task Manager</h1>
      <ul>
        {data?.tasks?.map((task: any) => (
          <li key={task.id}>
            {task.title} {task.completed ? "✅" : ""}
          </li>
        ))}
      </ul>
      <button onClick={() => addTask({ variables: { title: "New Task" } })}>
        Add Task
      </button>
    </div>
  );
};

export default TaskManager;
