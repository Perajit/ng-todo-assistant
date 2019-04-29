import { Controller, Get, Param } from "@nestjs/common";
import { TodoService } from "./todo.service";

@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService
  ) { }

  @Get('list')
  getTodoList() {
    // FIXME
    const userId = 1;
    return this.todoService.getTodoList(userId);
  }

  @Get(':id')
  getTodoDetail(
    @Param() params
  ) {
    const todoId = Number(params.id);
    return this.todoService.getTodoDetail(todoId);
  }
}
