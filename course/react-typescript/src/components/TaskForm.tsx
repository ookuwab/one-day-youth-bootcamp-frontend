import React, { useEffect } from 'react';
import type { Task } from '../';
import {Input,Button,Flex} from '@chakra-ui/react'

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  newTaskLabel: string;
  setNewTaskLabel: React.Dispatch<React.SetStateAction<string>>;
};
export const TaskForm: React.FC<Props> = ({
  tasks,
  setTasks,
  newTaskLabel,
  setNewTaskLabel
}) => {
  // フォームの値を保持する
  const handleNewTaskLabel = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskLabel(e.target.value);
  };
  // Taskの登録
  const handleAddTask = () => {
    const newTask = {label:newTaskLabel, isDone: false}
    setTasks([...tasks,newTask]);
    setNewTaskLabel('');
  };
  // 完了したTaskを削除する
  const handleClearTasks = () => {
    const newTasks = tasks.filter((task) => !task.isDone);
    setTasks(newTasks);
  };
  useEffect(()=>{
    console.log('tasks : ',tasks,'newTaskLabel',newTaskLabel);
  },[tasks,newTaskLabel]);

  return (
    <>
      <Input
        onChange={handleNewTaskLabel}
        value={newTaskLabel}
        placeholder="Enter the new task"
        my="1em"
      />
      <Flex justifyContent="flex-end">
        <Button onClick={handleClearTasks} colorScheme="gray" mr="0.5em">Clear</Button>
        <Button onClick={handleAddTask} colorScheme="red">Add</Button>
      </Flex>
    </>
  );
};

