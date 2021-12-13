import React from 'react';
import type { Task } from '../';
import { Flex,Checkbox,Text,Button } from '@chakra-ui/react';

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TaskList: React.FC<Props> = ({ tasks, setTasks }) => {
  // Taskの状態を切り替える
  const handleCheckBox = (
    isDone:boolean,
    i:number
  ) => {
    const newTasks : Task[] = tasks.map((task , _i) => {
      return _i === i ? { ...task, isDone: !isDone } : task;
    });
    setTasks(newTasks);
  };
  return (
    <>
      <Flex
        flexWrap="wrap"
        flexDir="row"
        my="1em"
      >
        {tasks.map((task,index) => (
          <Button
            key={`todo-${index}`}
            variant={!task.isDone ? "solid" :  "outline"}
            colorScheme={!task.isDone ? "green" :  "gray"}
            color={!task.isDone ? "#fff" :  "#ccc"}
            m="0.5em"
            onClick={() => handleCheckBox(task.isDone, index)}
          >
            {task.label}
          </Button>
        ))}
      </Flex>
    </>
  );
};
