import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { request } from "./server";
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { ChakraProvider, Box } from '@chakra-ui/react';

// TODOタスクの型
export type Task = {
  label:string;
  isDone:boolean;
};

const App: React.VFC = () => {
  // タスクリストを格納する
  const [tasks,setTasks] = useState<Task[]>([]);
  // 追加前のタスクを格納する
  const [newTaskLabel, setNewTaskLabel] = useState<string>('');
  // ページマウント時にモックAPIからデータを取得
  useEffect(() => {
    request.fetchTasks((payload: Task[]) => setTasks(payload) );
  },[]);


  return (
    <ChakraProvider>
      <Box w="100%" maxW='700px' m='0 auto' p="5px">
        {/* ヘッダー */}
        <Box fontSize="200%" textAlign="center" my="1em">
          Tutorial Works<br />React Todo List
        </Box>
        <hr />
        {/* 一覧表示 */}
        <TaskList {...{ tasks, setTasks }} />

        <hr />

        {/* タスク追加、削除 */}
        <TaskForm {...{ tasks, setTasks, newTaskLabel, setNewTaskLabel }} />
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
