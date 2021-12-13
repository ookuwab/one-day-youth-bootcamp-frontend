import { createServer, Model } from "miragejs";
import { Task } from "./";

// mock API
createServer({
  models: {
    task: Model,
  },

  seeds(server: any) {
    server.create('task', { label: '食器洗い', isDone: false });
    server.create('task', { label: '洗濯', isDone: false });
    server.create('task', { label: '食器洗いa', isDone: false });
    server.create('task', { label: '洗濯a', isDone: false });
    server.create('task', { label: '食器洗いbbb', isDone: false });
    server.create('task', { label: '洗濯b', isDone: false });
    server.create('task', { label: '食器洗いc', isDone: false });
    server.create('task', { label: '洗濯c', isDone: false });
    server.create('task', { label: '食器洗いdd', isDone: false });
    server.create('task', { label: '洗濯d', isDone: false });
    server.create('task', { label: '食器洗いeee', isDone: false });
    server.create('task', { label: 'あああああああああああああああああああああああああああああああああ', isDone: false });
  },

  routes() {
    this.namespace = 'api';
    
    // 取得
    this.get('/tasks', (schema: any) => {
      return schema.tasks.all();
    });
    // 作成
    this.post('/tasks', (schema: any, request) => {
      const attrs = JSON.parse(request.requestBody);
      return schema.tasks.post(attrs);
    });
    /// 削除
    this.delete('/tasks/:id', (schema: any, request) => {
      const id = request.params.id;
      return schema.tasks.find(id).destroy();
    });
  },
});


// Api Call
export const request = {
  // 取得
  fetchTasks: (afterFetch: (p: Task[]) => void) => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((json) => afterFetch(json.tasks))
      .catch((e) => console.log(e.message));
  },
  // 作成
  createTask: (data: Task) => {
    fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    }).catch((e) => console.log(e.message));
  },
  // 削除
  deleteTask: (id: number) => {
    fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    }).catch((e) => console.log(e.message));
  },
};

