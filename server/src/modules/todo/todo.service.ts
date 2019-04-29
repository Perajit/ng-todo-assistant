import { Injectable } from "@nestjs/common";

@Injectable()
export class TodoService {
  async getTodoList(userId: number) {
    // FIXME
    const list = [
      { id: 1, title: 'todo 1' },
      { id: 2, title: 'todo 2' }
    ];
    return Promise.resolve(list);
  }

  async getTodoDetail(todoId: number) {
    // FIXME
    const detail = {
      id: todoId,
      title: `todo ${todoId}`,
      description: `todo desc ${todoId}`,
      due: new Date()
    };
    return Promise.resolve(detail);
  }
}
