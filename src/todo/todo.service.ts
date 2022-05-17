import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { title, description } = createTodoDto;
    try {
      const todo = new this.todoModel({
        title,
        description,
      });
      await todo.save();
      return todo;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllTodo(): Promise<Todo[]> {
    try {
      const todo = await this.todoModel.find({});
      return todo;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getTodoById(id: string): Promise<Todo> {
    try {
      const todo = await this.todoModel.findOne({ _id: id });
      if (!todo) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }
      return todo;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.message,
          error.response.statusCode,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async updateTodo(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<{ message: string }> {
    const { title, description } = updateTodoDto;
    try {
      const updated = await this.todoModel.updateOne(
        { _id: id },
        { title, description },
      );
      if (updated.modifiedCount === 0) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }
      return {
        message: 'Todo updated successfully',
      };
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.message,
          error.response.statusCode,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteTodo(id: string): Promise<{ message: string }> {
    try {
      const deleteTodo = await this.todoModel.deleteOne({ _id: id });
      if (deleteTodo.deletedCount === 0) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }
      return {
        message: 'Todo deleted successfully',
      };
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.message,
          error.response.statusCode,
        );
      }
      throw new InternalServerErrorException();
    }
  }
}
