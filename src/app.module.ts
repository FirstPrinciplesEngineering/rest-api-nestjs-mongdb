import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://blog-project:dJqqxTYcDNsGB5WR@surreal-blogs.jlyml.mongodb.net/nestMongo?retryWrites=true&w=majority',
    ),
    TodoModule,
  ],
})
export class AppModule {}
